'use strict'

const Helpers = use('Helpers')
const publicPath = Helpers.publicPath()
const Directory = require ('fs')

module.exports = {
    createFile : async function(response, file_to_upload, primary_public_path, file_name) {

        const storagePath = publicPath + '/' + primary_public_path

        if(file_to_upload) {
            await file_to_upload.move(storagePath, {
                name: file_name
            })
            console.log('am in a custom file and i just save a file')

            if (!file_to_upload.moved()) {
                console.log('file_to_upload.err', file_to_upload.error())
                return response.status(406).send({
                    status: "error",
                    messages: "Invalid Request",
                    errors: file_to_upload.error()
                })
            }

            return true
        } 
    
    },
    updateFile : async function(response, file_to_upload, primary_public_path, file_name, old_file_url) {

        const old_file_url_array = old_file_url.split("/")
        const old_file_name = old_file_url_array[old_file_url_array.length - 1]
        const storagePath = publicPath + '/' + primary_public_path

        if(file_to_upload) {
            // check if file exist
            if (Directory.existsSync(`${storagePath}/${old_file_name}`)) {
              // console.log("logo file existed ---....>")
              Directory.unlink(`${storagePath}/${old_file_name}`, (err) => {
                if (err) {
                  console.log('file_to_upload.err', err)
                  return response.status(501).send({
                    status: "error",
                    messages: "Internal Error",
                    errors: err
                  })
                }
                console.log('existing file was replaced');
              })
            }
            await file_to_upload.move(storagePath, {
                name: file_name
            })
            console.log('am in a custom file and i just save a file')
            if (!file_to_upload.moved()) {
                console.log('file_to_upload.err', file_to_upload.error())
                return response.status(406).send({
                    status: "error",
                    messages: "Invalid Request",
                    errors: file_to_upload.error()
                })
            }

            return true
        } 
    
    },
    deleteFile : async function(response,  primary_public_path, old_file_url) {

        const old_file_url_array = old_file_url.split("/")
        const old_file_name = old_file_url_array[old_file_url_array.length - 1]
        const storagePath = publicPath + '/' + primary_public_path


        // check if file exist
        if (Directory.existsSync(`${storagePath}/${old_file_name}`)) {
            // console.log("logo file existed ---....>")
            Directory.unlink(`${storagePath}/${old_file_name}`, (err) => {
            if (err) {
                console.log('file_to_upload.err', err)
                return response.status(501).send({
                status: "error",
                messages: "Internal Error",
                errors: err
                })
            }
            console.log('existing file was deleted');
            })
        }

        return true
    
    }
}
