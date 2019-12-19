// my properties
var myProperties = {
    "bike": 1,
    "driving license": 1
};

// company list
var companies = [{
    title: "A",
    requires: {
        $and: {
            $or: {
                "apartment": 1,
                "house": 1
            },
            "property insurance": 1
        }
    }
}, {
    title: "B",
    requires: {
        $and: {
            $or: {
                "5 door car": 1,
                "4 door car": 1
            },
            "driving license": 1,
            "car insurance": 1
        }
    }
}, {
    title: "C",
    requires: {
        $and: {
            "social security number": 1,
            "work permit": 1
        }
    }
}, {
    title: "D",
    requires: {
        $or: {
            "apartment": 1,
            "flat": 1,
            "house": 1
        }
    }
}, {
    title: "E",
    requires: {
        $and: {
            "driving license": 1,
            $or: {
                "2 door car": 1,
                "3 door car": 1,
                "4 door car": 1,
                "5 door car": 1
            }
        }
    }
}, {
    title: "F",
    requires: {
        $and: {
            "driving license": 1,
            "motorcycle insurance": 1,
            $or: {
                "scooter": 1,
                "bike": 1,
                "motorcycle": 1
            }
        }
    }
}, {
    title: "G",
    requires: {
        $and: {
            "massage qualification certificate": 1,
            "liability insurance": 1
        }
    }
}, {
    title: "H",
    requires: {  
        $or: {
            "storage place": 1,
            "garage": 1
        }
    }
}, {
    title: "J",
    requires: {}
}, {
    title: "K",
    requires: {
        "PayPal account": 1
    }
}];

/**
 * Check if the person meets the company's job requirements
 * @param requirements Object representing the requirement block
 * @param myProperties The person's asset
 * @param relation Relation between requirement criteria
 */
function matchesRequirement(requirements, myProperties, relation = 'and', step = 0) {
    // console.log(`step=${step}`, requirements);
    var keys = Object.keys(requirements);
    for (let i = 0; i < keys.length; i++) {
        let pass;
        if (keys[i] === "$or") {
            pass = matchesRequirement(requirements["$or"], myProperties, "or", step + 1);
        } else if (keys[i] === "$and") {
            pass = matchesRequirement(requirements["$and"], myProperties, "and", step + 1);
        } else {
            pass = myProperties[keys[i]] != undefined && myProperties[keys[i]] >= requirements[keys[i]];
        }
        // console.log(keys[i], pass);
        if (relation == 'and' && pass == false) {
            return false;
        } else if (relation == 'or' && pass == true) {
            return true;
        }
    }

    return relation == 'or' ? false : true;
}

/**
 * Filters the companies that the person matches the criteria
 * @param companies 
 * @param myProperties 
 */
function filterCompanies(companies = [], myProperties) {
    return companies.filter(company => matchesRequirement(company.requires, myProperties)).map(company => `Company ${company.title}`);
}

var matches = filterCompanies(companies, myProperties);
console.log('matched companies', matches);