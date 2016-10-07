var model = {
    SearchTypes: [
        //{ DisplayValue: "Search by...", Value: "Name" },
        { DisplayValue: "Name", Value: "Name", Hint: "Search for a provider..." },
        { DisplayValue: "Specialty", Value: "Specialty", Hint: "Search for a specialty..." },
        { DisplayValue: "Condition", Value: "Condition", Hint: "Search for a condition..." }
    ],
    SortTypes: [
        { DisplayValue: "Name", Value: "Name" },
        { DisplayValue: "Closest", Value: "Closest" },
        { DisplayValue: "Zip", Value: "Zip" }
    ],
    Genders: [
        { DisplayValue: "Select Gender...", Value: "A" },
        { DisplayValue: "Male", Value: "Male" },
        { DisplayValue: "Female", Value: "Female" }
    ]
}

module.exports = model;