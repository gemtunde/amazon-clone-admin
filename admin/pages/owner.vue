<template>
    <div class="container-fluid">
        <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
            <div class="a-section">
                <div class="a-spacing-top-medium"></div>
                 <h2 style="text-align: center;">Add a new owner</h2>
                 <form>
                    <!-- name -->
                    <div class="a-spacing-top-medium">
                        <label>name</label>
                        <input type="text" class="a-type-text" style="width:100%" v-model="name"/>
                    </div>
                    <!-- about -->
                    <div class="a-spacing-top-medium">
                        <label>about</label>
                        <input type="text" class="a-type-text" style="width:100%" v-model="about"/>
                    </div>
                    <!-- photo -->
                                    <div class="a-spacing-top-medium">
                                        <label style="margin-bottom: 8px;">Add Photo</label>
                                         <div class="a-row a-spacing-top-medium">
                                            <label class="choosefile-button">
                                                <i class="fal fa-plus"></i>
                                                <input type="file" @change="onFileSelected"/>
                                                <p style="margin-top: -70px">{{ fileName }}</p>
                                            </label>
                                         </div>
                                    </div>
                     <!-- button -->
                         <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                 <span class="a-button-inner">
                                    <span class="a-button-text"  @click="onAddOwner">Add owner</span>
                                </span>
                            </span>
                         </div>
                         <br />
                         <ul class="group-list-item">
                            <li v-for="owner in owners" :key="owner._id"> {{ owner.name }}</li>
                         </ul>
                 </form>
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    </div>
</template>

<script>
export default {
    async asyncData({$axios}){
       try {
         let response = await $axios.$get("http://localhost:3000/api/owners");
         return{
            owners: response.owner
         }
       } catch (error) {
        console.log(error)
       }
    },

    data(){
        return{
            name: "",
            about:"",
            selectedFile: null,
            fileName: ""
        }
    },
    methods: {
        onFileSelected(event){
              this.selectedFile = event.target.files[0];
            console.log(this.selectedFile)
            this.fileName = event.target.files[0].name;
        },
      async  onAddOwner(){
            try {
                let data = new FormData();
                data.append("name", this.name);
                data.append("about", this.about);
                data.append("photo", this.selectedFile, this.selectedFile.name);

                let response = await this.$axios.$post("http://localhost:3000/api/owners", data);
                this.owners.push({name : this.name});
                this.name = "";
                this.about ="";
                 this.selectedFile= null;
                 this.fileName= ""
            } catch (error) {
                console.log(error)
            }
        }
       
    }
}
</script>