<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center;">Add a new product</h2>
                        <form>
                            <!-- category -->
                            <div class="a-spacing-top-medium">
                                <label>category</label>
                                <select class="a-select-option" v-model="categoryID">
                                    <option v-for="category in categories" :key="category._id" :value="category._id">
                                        {{ category.type }}</option>
                                </select>
                            </div>
                            <!-- owner -->
                            <div class="a-spacing-top-medium">
                                <label>owner</label>
                                <select class="a-select-option" v-model="ownerID">
                                    <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                                        {{ owner.name }}</option>
                                </select>

                            </div>
                            <!-- title input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 8px;">Title</label>
                                <input type="text" class="a-input-text" style="width:100%" v-model="title" />
                            </div>
                            <!-- pricee input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 8px;">Price</label>
                                <input type="number" class="a-input-text" style="width:100%" v-model="price" />
                            </div>
                            <!-- stock input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 8px;">stock quantity</label>
                                <input type="number" class="a-input-text" style="width:100%" v-model="stockQuantity" />
                            </div>
                            <!-- Desscription input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 8px;">Description</label>
                                <textarea type="text" class="a-input-text" style="width:100%; height: 100px;"
                                    v-model="description"></textarea>
                            </div>
                            <!-- photo -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 8px;">Add Photo</label>
                                <div class="a-row a-spacing-top-medium">
                                    <label class="choosefile-button">
                                        <i class="fal fa-plus"></i>
                                        <input type="file" @change="onFileSelected" />
                                        <p style="margin-top: -70px">{{ fileName }}</p>
                                    </label>
                                </div>
                            </div>
                            <hr />
                            <!-- button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddProduct">Add Product</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>


<script>
export default {
    async asyncData({ $axios }) {
        try {
            let categories = $axios.$get("http://localhost:3000/api/categories");
            let owners = $axios.$get("http://localhost:3000/api/owners");

            const [catResponse, ownerResponse] = await Promise.all([
                categories,
                owners
            ]);

            return {
                categories: catResponse.categories,
                owners: ownerResponse.owner,
            }
        } catch (error) {
            console.log(error)
        }
    },
    data() {

        return {
            categoryID: null,
            ownerID: null,
            title: "",
            price: 0,
            stockQuantity: 1,
            description: "",
            selectedFile: null,
            fileName: ""
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile)
            this.fileName = event.target.files[0].name;
        },
        async onAddProduct() {

            let data = new FormData();
            data.append("title", this.title);
            data.append("price", this.price);
            data.append("description", this.description);
            data.append("stockQuantity", this.stockQuantity);
            data.append("ownerID", this.ownerID);
            data.append("categoryID", this.categoryID);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            let result = await this.$axios.$post("http://localhost:3000/api/products", data);
            this.$router.push("/");

        }
    }
}
</script>