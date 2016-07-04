import {Component, OnInit, Injectable} from "@angular/core";

@Component({
    selector: "my-app",
    template: `

<StackLayout [model]="settings"> 
	<Label text="Profile" class="title"></Label> 

	<GridLayout columns="10, 100, 110, 10, 72, 110, *" rows="auto, auto, auto, auto, auto, auto, auto, auto, auto" > 

		<Label row="0" col="1" text="First Name:" verticalAlignment="center"></Label> 
		<TextField  row="0" col=2 class="Text" #FirstName></TextField> 	  

		<Label row="0" col="4" text="Last Name:"  verticalAlignment="center" horizontalAlignment="right"></Label> 
		<TextField row="0" col=5 class="Text" #LastName></TextField> 

		<Label row="1" col="1" text="Birth Date:"  verticalAlignment="center"></Label> 
		<TextField row="1" col=2 class="Text" #LastName></TextField> 

		<Label row="2" col="1" text="Sex:"  verticalAlignment="center"></Label> 
		<Switch row="2" col=2 class="Switch" horizontalAlignment="left" #Sex ></Switch> 

		<Label row="3" col="1" text="Profile Metric:"  verticalAlignment="center"></Label> 
		<Switch row="3" col=2 class="Switch" horizontalAlignment="left" #ProfileMetric [checked]="settings.profileMetric"></Switch> 		  

		<Label row="4" col="1" text="Recipe Metric:"  verticalAlignment="center"></Label> 
		<Switch row="4" col=2 class="Switch" horizontalAlignment="left" #RecipeMetric [checked]="recipeMetric"></Switch> 		  

		<Label row="5" col="1" text="Nutrient Metric:"  verticalAlignment="center"></Label> 
		<Switch row="5" col=2 class="Switch" horizontalAlignment="left" #NutrientMetric [checked]="nutrientMetricChecked"></Switch> 

	</GridLayout> 
</StackLayout> 


`,
})


export class Profile implements OnInit {
    settings: string;
    nutrientMetricChecked: boolean;
    sexChecked: boolean;
     
    constructor(private profileService: ProfileService) {  }
 
 
    ngOnInit() {
        this.getSettings();
    }
 
    getSettings() {
        this.profileService.getProfileSettings()
            .then(data => {
                this.settings = data;
                this.nutrientMetricChecked = this.settings.NutrientMetric;      
            });
    }
}
