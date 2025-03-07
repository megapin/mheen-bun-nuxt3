<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
// import { ProductService } from '@/service/ProductService';
/*{ id: '1000', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description',
    image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },*/

// onMounted(async () => { ProductService.getProducts().then((data) => (products.value = data)); });
const pb = usePb()
const invoices = await pb.collection('invoices').getFullList({expand: 'billto,sender'})
const invoice_services = await pb.collection('invoice_services').getFullList({expand: 'service'})

const toast = useToast();
const dt = ref();
const products = ref();
products.value = invoices.map(x => {
	const company = x.expand.billto.name
	const services = invoice_services.filter(s => s.invoice == x.id)
	const subtotal = services.reduce((acc,cur) => acc + cur.expand.service.price * cur.days, 0)
	const vat = subtotal * 10/100
	const total = subtotal + +vat
	const price = (Math.floor(total*x.dc/10000)*10000).toLocaleString()
	return {...x, company, price}
})
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({ 'global': {value: null, matchMode: FilterMatchMode.CONTAINS}, });
const submitted = ref(false);
const statuses = ref([
	{label: 'INSTOCK', value: 'instock'},
	{label: 'LOWSTOCK', value: 'lowstock'},
	{label: 'OUTOFSTOCK', value: 'outofstock'}
]);

// const formatCurrency = (value) => value?.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
const openNew = () => {
	product.value = {};
	submitted.value = false;
	productDialog.value = true;
};
const hideDialog = () => {
	productDialog.value = false;
	submitted.value = false;
};
const saveProduct = () => {
	submitted.value = true;
	if (product?.value.company?.trim()) {
		if (product.value.id) {
			product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
			products.value[findIndexById(product.value.id)] = product.value;
			toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
		}
		else {
			product.value.id = createId();
			product.value.code = createId();
			product.value.image = 'product-placeholder.svg';
			product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
			products.value.push(product.value);
			toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
		}
		productDialog.value = false;
		product.value = {};
	}
};
const editProduct = (prod) => {
	product.value = {...prod};
	productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
	product.value = prod;
	deleteProductDialog.value = true;
};
const deleteProduct = () => {
	products.value = products.value.filter(val => val.id !== product.value.id);
	deleteProductDialog.value = false;
	product.value = {};
	toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
const findIndexById = (id) => {
	let index = -1;
	for (let i = 0; i < products.value.length; i++) {
		if (products.value[i].id === id) {
			index = i;
			break;
		}
	}
	return index;
};
// const createId = () => {
// 	let id = '';
// 	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	for ( var i = 0; i < 5; i++ ) { id += chars.charAt(Math.floor(Math.random() * chars.length)); }
// 	return id;
// }
const createId = () => Date.now().toString(36) // new Date(parseInt(Date.now().toString(36), 36))
const exportCSV = () => dt.value.exportCSV()
const confirmDeleteSelected = () => deleteProductsDialog.value = true
const deleteSelectedProducts = () => {
	products.value = products.value.filter(val => !selectedProducts.value.includes(val));
	deleteProductsDialog.value = false;
	selectedProducts.value = null;
	toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

// const _getStatusLabel = (status) => {
// 	switch (status) {
// 		case 'INSTOCK': return 'success';
// 		case 'LOWSTOCK': return 'warning';
// 		case 'OUTOFSTOCK': return 'danger';
// 		default: return null;
// 	}
// };
const getStatusLabel = { 
	instock: 'success', 
	lowstock: 'warning', 
	outofstock: 'danger', 
	default: null 
}
</script>

<template>
	<div>
		<div class="card">
			<Toolbar class="mb-4">
				<template #start>
					<Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
					<Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
				</template>
				<template #end>
					<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
					<Button label="Export" icon="pi pi-download" severity="help" @click="exportCSV($event)"  />
				</template>
			</Toolbar>

			<DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
				:paginator="true" :rows="10" :filters="filters"
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
				currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
				<template #header>
					<div class="flex gap-2 flex-items-center justify-between">
						<h4 class="m-0">Manage Invoices</h4>
						<IconField iconPosition="left">
							<InputIcon> <i class="pi pi-search" /> </InputIcon>
							<InputText v-model="filters['global'].value" placeholder="Search..." />
						</IconField>
					</div>
				</template>
				<Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
				<Column field="id" header="ID" sortable style="min-width:12rem"></Column>
				<Column field="number" header="Number" sortable style="min-width:16rem"></Column>
				<Column field="company" header="Company" sortable style="min-width:16rem"></Column>
				<!-- <Column header="Image"> -->
				<!-- 	<template #body="slotProps"> -->
				<!-- 		<img :src="`/img/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" width="64px" /> -->
				<!-- 	</template> -->
				<!-- </Column> -->
				<Column field="price" header="Price" sortable style="min-width:8rem">
					<!-- <template #body="slotProps"> -->
					<!-- 	{{formatCurrency(slotProps.data.price)}} -->
					<!-- </template> -->
				</Column>
				<Column field="category" header="Category" sortable style="min-width:10rem"></Column>
				<!-- <Column field="rating" header="Reviews" sortable style="min-width:12rem"> -->
				<!-- 	<template #body="slotProps"> -->
				<!-- 		<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" /> -->
				<!-- 	</template> -->
				<!-- </Column> -->
				<Column field="inventoryStatus" header="Status" sortable style="min-width:12rem">
					<template #body="slotProps">
						<Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel[slotProps.data.inventoryStatus]" />
					</template>
				</Column>
				<Column :exportable="false" style="min-width:8rem">
					<template #body="slotProps">
						<Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
						<Button icon="pi pi-print" outlined rounded severity="info" class="mr-2"
							@click="navigateTo(`/quotes/print-view?id=${slotProps.data.id}`)" />
						<Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
					</template>
				</Column>
			</DataTable>
		</div>

		<Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
			<img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-3" />
			<div class="field">
				<label for="company">Company</label>
				<InputText id="company" v-model.trim="product.company" required="true" autofocus :invalid="submitted && !product.company" />
				<small class="p-error" v-if="submitted && !product.company">Name is required.</small>
			</div>
			<div class="field">
				<label for="description">Description</label>
				<Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
			</div>
			<div class="field">
				<label for="inventoryStatus" class="mb-3">Inventory Status</label>
				<Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<Tag :value="slotProps.value.value" :severity="getStatusLabel[slotProps.value.value]" />
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<Tag :value="slotProps.value" :severity="getStatusLabel[slotProps.value]" />
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div>
			<div class="field">
				<label class="mb-3">Category</label>
				<div class="formgrid grid flex flex-wrap ">
					<div class="field-radiobutton col-6 w50%" v-for="item in ['accessories','clothing','electronics','fitness']">
						<RadioButton :id="`category-${item}`" name="category" :value="item" v-model="product.category" />
						<label :for="`category-${item}`">{{item.charAt(0).toUpperCase() + item.slice(1)}}</label>
					</div>
				</div>
			</div>
			<div class="formgrid grid flex flex-wrap">
				<div class="field col w50% pr2">
					<label for="price">Price</label>
					<!-- <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" /> -->
					<InputText id="price" v-model="product.price" />
				</div>
				<div class="field col w50%">
					<label for="quantity">Quantity</label>
					<InputNumber id="quantity" v-model="product.quantity" integeronly />
				</div>
			</div>
			<template #footer>
				<Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
				<Button label="Save" icon="pi pi-check" text @click="saveProduct" />
			</template>
		</Dialog>

		<Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
			<div class="confirmation-content">
				<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
				<span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
			</div>
			<template #footer>
				<Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
				<Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
			</template>
		</Dialog>

		<Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
			<div class="confirmation-content">
				<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
				<span v-if="product">Are you sure you want to delete the selected products?</span>
			</div>
			<template #footer>
				<Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
				<Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
			</template>
		</Dialog>
	</div>
</template>
