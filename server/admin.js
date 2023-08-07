const express = require('express');
const multer = require('multer');
const path = require("path");
const adminCon = require('../controller/admin');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
}).any();

// Router admin
router.get('/read', adminCon.getRead);
router.patch('/edit', upload, adminCon.patchEdit);
router.patch('/edit-user', adminCon.patchEditUser);

// Router house_zone
router.get('/house_zone/read', adminCon.getHouseZoneRead);
router.post('/house_zone/read/id', adminCon.postHouseZoneIDRead);
router.post('/house_zone/add', adminCon.postHouseZoneAdd);
router.patch('/house_zone/edit', adminCon.patchHouseZoneEdit);
router.delete('/house_zone/delete', adminCon.deleteHouseZone);

// Router house
router.get('/house/read', adminCon.getHouseRead);
router.post('/house/read/id', adminCon.postHouseIDRead);
router.post('/house/read/zone', adminCon.postHouseReadZone);
router.post('/house/read/number', adminCon.postHouseReadNum);
router.post('/house/add', upload, adminCon.postHouseAdd);
router.patch('/house/edit', upload, adminCon.patchHouseEdit);
router.delete('/house/delete', adminCon.deleteHouse);

module.exports = router;