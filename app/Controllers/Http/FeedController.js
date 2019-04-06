'use strict'

const Feed = use('App/Models/Feed')

class FeedController { 
    async createFeed ({request, auth, response}) {
        try {
            const {title, content} = request.post()
            const feed = new Feed()
            feed.title = title ? title : '',
            feed.content = content ? content : ''
            feed.user_id = auth.current.user.id
            const saveFeed = await feed.save()
            return response.status(201).json({
                status: 'Success',
                Message : 'Successfully Created Feed',
                data: saveFeed
            })
        } catch (error) {
           console.log(error) 
        }
        
    }
    async getSingleFeed({params, response}) {
        try {
            const {feed_id} = params

            const feed = await Feed.query().where("id", feed_id).with('user').first()
            response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch feed',
                data: feed
            })
        } catch (error) {
            console.log(error)
        }
    }
    async getAllFeed({response}) {
        try {
            const feeds = await Feed.query().with('user').fetch()
            response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch feeds',
                data: feeds
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getUserFeed({auth, response}) {
        try {
            const userFeed = await Feed.query().where('user_id', auth.current.user.id).fetch()
            response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch user feeds',
                data: userFeed
            })
        } catch (error) {
            console.log(error)
        }
    }
    async deleteFeed({auth, response, request, params}) {
        try {
            var deleteFeed
            const {feed_id} = params
            console.log(request.deletePriviledge)
            if (request.deletePriviledge) {
                deleteFeed = await Feed.query().where("id", feed_id).first()
                if (!deleteFeed) {
                    throw response.status(200).json({
                        status: "Success",
                        Message: "Feed does not exist"
                    })
                }
                await deleteFeed.delete()
                return response.status(200).json({
                    status: "Success",
                    Message: "Successfully deleted feed"
                })
            } else {
                deleteFeed = await Feed.query()
                .where("id", feed_id)
                .andWhere("user_id", auth.current.user.id)
                .first()
                if (!deleteFeed) {
                    throw response.status(200).json({
                        status: "Success",
                        Message: "Feed does not exist"
                    })
                }
                await deleteFeed.delete()
                return response.status(200).json({
                    status: "Success",
                    Message: "Successfully deleted feed"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = FeedController
