'use strict'

const ResourceType = use('App/Models/ResourceType')

class ResourceTypeController {
    async getAll ({response}) {
        try {
            const all_resource_type = await ResourceType.query().fetch()
            response.status(200).json({
                status: "Success",
                Message: "Successfully fetch all resource",
                data: all_resource_type
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    async getOne ( {params, response} ) {
        const resource_type_id = params.resource_type_id

        const resourceType = await ResourceType.query().where("id", resource_type_id).fetch()
        response.status(200).json({
            status: 'Success',
            message: 'Successfully fetch user_type',
            data: resourceType
        })
    }
}

module.exports = ResourceTypeController
