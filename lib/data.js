/*
* Title: data
* Description: 
* Author: Code Hp
* Date: 29/11/2020 
*
*/

// Dependencies 
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            // const stringData  
            // convart data to string
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if(!err2){
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3){
                            callback(false);
                        } else {
                            callback("Erroe closing the new file!");
                        }
                    });
                }else{
                    callback("Error writing new file, it may already exits")
                }
            });
        }else{
            callback("Could not create new file, it may alrady exists! "+err);
        }
    });
}

// read data to file
lib.read = (dir,file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    })
}

// update existing file
lib.update = (dir, file, data, callback) => {
    //file open for writing
    fs.open(lib.basedir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            // convert the data to string 
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if(!err1){
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if(!err2){
                            // close the file
                            fs.close(fileDescriptor, (err3)=>{
                                if(!err3){
                                    callback(false);
                                } else {
                                    callback('error closing file')
                                }
                            });
                        } else {
                            callback("Error writing to file ");
                        }
                    });
                } else {
                    callback("Error update file :" + err2);
                }
            });
        }else{
            callback("Update file not existing or error:",err1);
        }
    })
};

// delete existing file
lib.delete = (dir,file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if(!err){
            callback(false);
        } else {
            callback("error file delete ");
        }

    });
};

// module export
module.exports = lib;