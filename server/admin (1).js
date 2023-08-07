const bcrypt = require('bcrypt');
const db = require('../util/database');

const saltRounds = 10;

// admin
exports.getRead = (req, res) => {
    try {
        db.query("SELECT *, CONCAT('http://26.90.237.200:3000/upload/', image) AS image FROM housing_estate", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (result.length === 0) {
                return res.status(401).json({ message: "House Estate Is Not Found!" });
            }
            res.status(200).json(result);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.patchEdit = (req, res) => {
    const id = req.body.id;
    const newMName = req.body.newMName;
    const newMLname = req.body.newMLname;
    const newDownRate = req.body.newDownRate;
    const newName = req.body.newName;
    const newCompany = req.body.newCompany;
    const newPhone = req.body.newPhone;
    const newAddress = req.body.newAddress;
    const newMDName = req.body.newMDName;
    const newMDNationality = req.body.newMDNationality;
    const newMDAddress = req.body.newMDAddress;
    let newImages = req.files.find(file => file.fieldname === 'newImages');

    try {
        if (req.file) {
            newImages = req.file.filename;
        }
        db.query("UPDATE housing_estate SET manager_name = ?, manager_lastname = ?, down_rate = ?, name = ?, company = ?, phone = ?, address = ?, md_name = ?, md_nationality = ?, md_address = ?, image = ? WHERE he_id = ?",
            [
                newMName,
                newMLname,
                newDownRate,
                newName,
                newCompany,
                newPhone,
                newAddress,
                newMDName,
                newMDNationality,
                newMDAddress,
                newImages.filename,
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Update House Estate!" });
                }
                console.log(result);
                res.status(200).json({ message: "House Estate Is Update Success!" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.patchEditUser = (req, res) => {
    const id = req.body.id;
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;
    try {
        bcrypt.hash(newPassword, saltRounds, function (err, hash) {
            db.query("UPDATE housing_estate SET he_username = ?, he_password = ? WHERE he_id = ?",
                [
                    newUsername,
                    hash,
                    id
                ],
                (err, result, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    if (result.affectedRows === 0) {
                        return res.status(401).json({ message: "Failed To Update User Admin!" });
                    }
                    console.log(result);
                    res.status(200).json({ message: "User Admin Is Update Success!" });
                }
            );
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

// house_zone
exports.getHouseZoneRead = (req, res) => {
    try {
        db.query("SELECT * FROM house_zone", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (result.length == 0) {
                return res.status(401).json({ message: "House Zone Is Not Found!" });
            }
            res.status(200).json(result);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.postHouseZoneIDRead = (req, res) => {
    const id = req.body.id;
    try {
        db.query("SELECT * FROM house_zone WHERE hz_id = ?",
            [
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.length == 0) {
                    return res.status(401).json({ message: "House Zone Is Not Found!" });
                }
                res.status(200).json(result);
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.postHouseZoneAdd = (req, res) => {
    const addName = req.body.addName;

    try {
        db.query("INSERT INTO house_zone (name) VALUES (?)",
            [
                addName,
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Insert House Zone!" });
                }
                console.log(result);
                res.status(200).json({ message: "House Zone Is Adding Success!" });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.patchHouseZoneEdit = (req, res) => {
    const id = req.body.id;
    const newName = req.body.newName;

    try {
        db.query("UPDATE house_zone SET name = ? WHERE hz_id = ?",
            [
                newName,
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Update House Zone!" });
                }
                console.log(result);
                res.status(200).json({ message: "House Zone Is Update Success!" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.deleteHouseZone = (req, res) => {
    const id = req.body.id;
    try {
        db.query("DELETE FROM house_zone WHERE hz_id = ?",
            [
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Delete House Zone!" });
                }
                console.log(result);
                res.status(200).json({ message: "House Zone Is Delete Success!" });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

// house
exports.getHouseRead = (req, res) => {
    try {
        db.query("SELECT *, CONCAT('http://26.90.237.200:3000/upload/', image) AS image FROM house", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (result.length == 0) {
                return res.status(401).json({ message: "House Is Not Found!" });
            }
            res.status(200).json(result);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.postHouseIDRead = (req, res) => {
    const id = req.body.id;
    try {
        db.query("SELECT *, CONCAT('http://26.90.237.200:3000/upload/', image) AS image FROM house WHERE h_id = ?",
            [
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.length == 0) {
                    return res.status(401).json({ message: "House Is Not Found!" });
                }
                res.status(200).json(result);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.postHouseReadZone = (req, res) => {
    const id = req.body.id;
    try {
        db.query("SELECT house.*, CONCAT('http://26.90.237.200:3000/upload/', image) AS image, house_zone.name FROM house INNER JOIN house_zone ON house.hz_id = house_zone.hz_id WHERE house_zone.hz_id = '?'",
            [
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.length == 0) {
                    return res.status(401).json({ message: "House Is Not Found!" });
                }
                res.status(200).json(result);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.postHouseReadNum = (req, res) => {
    const number = req.body.number;
    try {
        db.query("SELECT *, CONCAT('http://26.90.237.200:3000/upload/', image) AS image FROM house WHERE no = ?",
            [
                number
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.length == 0) {
                    return res.status(401).json({ message: "House Is Not Found!" });
                }
                res.status(200).json(result);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.postHouseAdd = (req, res) => {
    const id = req.body.id;
    const addHousePlan = req.body.addHousePlan;
    const addNumDeed = req.body.addNumDeed;
    const addNumSurvey = req.body.addNumSurvey;
    const addLandArea = req.body.addLandArea;
    const addArea = req.body.addArea;
    const addPrice = req.body.addPrice;
    const addBookingPrice = req.body.addBookingPrice;
    const addNote = req.body.addNote;
    let addImage = req.files.find(file => file.fieldname === 'addImage');
    const addidFK = req.body.addidFK;

    try {
        db.query("INSERT INTO house (h_id, house_plan, num_deed, num_survey, land_area, area, h_price, book_price, transfer_price, h_note, status, image, hz_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? - ?, ?, 0, ?, ?)",
            [
                id,
                addHousePlan,
                addNumDeed,
                addNumSurvey,
                addLandArea,
                addArea,
                addPrice,
                addBookingPrice,

                addPrice,
                addBookingPrice,

                addNote,
                addImage.filename,
                addidFK
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Insert House!" });
                }
                console.log(result);
                res.status(200).json({ message: "House Is Adding Success!" });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.patchHouseEdit = (req, res) => {
    const id = req.body.id;
    const newHousePlan = req.body.newHousePlan;
    const newNumDeed = req.body.newNumDeed;
    const newNumSurvey = req.body.newNumSurvey;
    const newLandArea = req.body.newLandArea;
    const newArea = req.body.newArea;
    const newPrice = req.body.newPrice;
    const newBookingPrice = req.body.newBookingPrice;
    const newNote = req.body.newNote;
    let newImage = req.files.find(file => file.fieldname === 'newImage');
    const newidFK = req.body.newidFK;

    try {
        db.query("UPDATE house SET house_plan = ?, num_deed = ?, num_survey = ?, land_area = ?, area = ?, h_price = ?, book_price = ?, transfer_price = ? - ?, h_note = ?, image = ?, hz_id = ? WHERE h_id = ?",
            [
                newHousePlan,
                newNumDeed,
                newNumSurvey,
                newLandArea,
                newArea,
                newPrice,
                newBookingPrice,

                newPrice,
                newBookingPrice,

                newNote,
                newImage.filename,
                newidFK,
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Update House!" })
                }
                console.log(result);
                res.status(200).json({ message: "House Is Update Success!" });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.deleteHouse = (req, res) => {
    const id = req.body.id;
    try {
        db.query("DELETE FROM house WHERE h_id = ?",
            [
                id
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    return res.status(401).json({ message: "Failed To Delete House!" });
                }
                console.log(result);
                res.status(200).json({ message: "House Is Delete Success!" });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};