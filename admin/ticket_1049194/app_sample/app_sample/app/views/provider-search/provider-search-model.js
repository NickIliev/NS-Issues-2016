var model = {
    SearchTypes: [
        "Name",
        "Specialty",
        "Condition"
    ],
    SortTypes: [
        { DisplayValue: "Name", Value: "Name" },
        { DisplayValue: "Closest", Value: "Closest" },
        { DisplayValue: "Zip", Value: "Zip" }
    ],
    Genders: [
        { DisplayValue: "All", Value: "A" },
        { DisplayValue: "Male", Value: "M" },
        { DisplayValue: "Female", Value: "F" }
    ]
}

module.exports = model;