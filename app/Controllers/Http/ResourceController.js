'use strict'

const ResourceType = use("App/Models/ResourceType")
const Resource = use("App/Models/Resource")
const Env = use('Env')
const UploadFile = use('App/CustomFunction/UploadFile')

class ResourceController {
    async createResource({auth, request, response}) {
        const {resource_type_id, name, content, description} = request.post()

        const getResourceType = await ResourceType.query().where("id", resource_type_id).first()
        const newResource = new Resource()
        if ((getResourceType.title == "Text") && content) {
            newResource.name = name
            newResource.content = content
            newResource.description = !!description && description
            newResource.resource_type_id = resource_type_id
            newResource.user_id = auth.current.user.id
        } else {
            const ResourceFile = request.file('resource_file', {
                types: ['image', "pdf"],
                size: '5mb'
            })
            if (!ResourceFile) {
                return response.status(404).json({
                    status: 'Failed',
                    message: 'resource file is required'
                })
            }

            var resourceFileName = `${new Date().getTime()}_${ResourceFile.fieldName}.${ResourceFile.extname}`

            var upload_file = await UploadFile.createFile(response, ResourceFile, 'uploads/resource-file', resourceFileName)

            console.log('new resource upload file >> ', upload_file)

            newResource.name = name
            newResource.description = !!description && description
            newResource.resource_url = Env.get('APP_URL','127.0.0.1')+'/uploads/resource-file/'+resourceFileName
            newResource.user_id = auth.current.user.id
            newResource.resource_type_id = resource_type_id
        }

        await newResource.save()
        return response.status(201).json({
            status: "Success",
            Message: "Successfully created resource",
            data: newResource
        })

    }
    async getAll({response}) {
        try {
            const all_resource = await Resource.query().fetch()
            response.status(200).json({
                status: "Success",
                Message: "Successfully fetch all resources",
                data: all_resource
            })
        } catch (error) {
            console.log(error)
        }
    }
    async getSingleResource({params, response, auth}) {
        try {
            const {resource_id} = params
            const user_id = auth.current.user.id
            const get_single_resource = await Resource.query().where("id", resource_id).first()
            if ((get_single_resource.user_id != user_id) && (is_private == 1)) {
                return response.status(400).json({
                    status: "Failed",
                    Message: "Resource does not exist"
                })
            } else {
                return response.status(200).json({
                    status:  "Success",
                    Message: "Succesfully fetch single user",
                    data: get_single_resource
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getUserResource ({params, response}) {
        try {
            const {user_id} = params
            const get_user_resource = await Resource
            .query()
            .where("user_id", user_id)
            .andWhere('is_private', 0)
            .fetch()

            return response.status(200).json({
                status: "Success",
                Message: "Successfully fetch all users resource",
                data: get_user_resource
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getMyResource ({auth, response}) {
        try {
            const get_my_resource = await Resource
            .query()
            .where("user_id", auth.current.user.id)
            .fetch()

            return response.status(200).json({
                status: "Success",
                Message: "Successfully get my resources",
                data: get_my_resource
            })
        } catch (error) {
            console.log(error)
        }
    }

    async updateResource( {auth, request, response, params} ) {
        try {
            const {resource_id} = params
            const {name, description, content, is_deleted, is_private} = request.post()

            const get_resource = await Resource.query().where("id", resource_id).first()

            const resource_url = get_resource.resource_url
            const resourceTypeId = get_resource.resource_type_id

            const getResourceType = await ResourceType.query().where("id", resourceTypeId).first()
            if (getResourceType.title != "Text") {
                var ResourceFile = request.file('resource_file', {
                    types: ['image', "pdf"],
                    size: '5mb'
                })

                if (ResourceFile) {
                    var resourceFileName = `${new Date().getTime()}_${ResourceFile.fieldName}.${ResourceFile.extname}`

                    const update_file = await UploadFile.updateFile(response, ResourceFile, 'uploads/resource-file', resourceFileName, resource_url)
        
                    console.log('new edited file >> ', update_file)

                }

            }
                
            if ((get_resource.user_id != auth.current.user.id) && (is_deleted == 0)) {
                return response.status(400).json({
                    status: 'Failed',
                    Message: "Resource does not exist"
                })
            } else {
                get_resource.resource_url = (ResourceFile) ? Env.get('APP_URL','127.0.0.1')+'/uploads/product-image/'+resourceFileName : resource_url
                get_resource.name = name ? name : get_resource.name
                get_resource.description = description ? description : get_resource.description
                get_resource.content = content ? content : get_resource.content
                get_resource.is_private = is_private ? is_private : get_resource.is_private
                await get_resource.save()
                return response.status(202).json({
                    status: 'Success',
                    Message: " Succeessfully update resources"
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = ResourceController
