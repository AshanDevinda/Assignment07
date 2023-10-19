// customer db
import {CustomerModel} from "../model/CustomerModel.js";

const db = [];

// clear imputs
function clearAddInputs() {
    $("#customer_id").val("");
    $("#customer_name").val("");
    $("#customer-nic").val("");
    $("#contact").val("");
}
function clearUpdateInputs() {
    $("#customer-id-u").val("");
    $("#customer-name-u").val("");
    $("#customer-nic-u").val("");
    $("#contact-u").val("");
}

// load all customers to table
function loadAll() {
    $("#c-tbl-body").empty();
    db.map((item, index) => {
        let customer =
            `<tr><td class="customer-id">${item.customer_id}</td><td class="customer-name">${item.customer_name}</td><td class="nic">${item.nic}</td><td class="contact">${item.contact}</td></td></tr>`
        $("#c-tbl-body").append(customer);
    })
}

//save customer
$("#c-add_btn").on('click', () => {
    db.push(new CustomerModel($("#customer_id").val(), $("#customer_name").val(), $("#customer-nic").val(), $("#contact").val()));
    clearAddInputs();
    loadAll();
});

// clicked raw set to input fields
let cus_id;
$("#c-tbl-body").on('click', ("tr"), function () {
    $("#customer-id-u").val($(this).find(".customer-id").text());
    $("#customer-name-u").val($(this).find(".customer-name").text());
    $("#customer-nic-u").val($(this).find(".nic").text());
    $("#contact-u").val($(this).find(".contact").text());
    cus_id = $(this).find(".customer-id").text();
});

//update customer
$("#c-update-btn").on('click', () => {
   db[db.findIndex(item => item.customer_id === $("#customer-id-u").val())] = new CustomerModel($("#customer-id-u").val(), $("#customer-name-u").val(), $("#customer-nic-u").val(), $("#contact-u").val());
   loadAll();
   clearUpdateInputs()
});

// delete customer
$("#c-crudButtons>button[type='button']").eq(2).on('click', () => {
    db.splice(db.findIndex(item => item.customer_id === cus_id), 1);
    loadAll();
});

// see all customer
$("#c-crudButtons>button[type='button']").eq(3).on('click', () => {
    // loadAll();
    console.log($("#c-tbl-body tr"));
});

//search bar
$("#search-input").on('click', () => {
    db.forEach(function (item) {
        if (item.nic.includes($("#search-input").val())) {
            let customer =
                `<tr><td class="customer-id">${item.customer_id}</td><td class="customer-name">${item.customer_name}</td><td class="nic">${item.nic}</td><td class="contact">${item.contact}</td></td></tr>`
            $("#c-tbl-body").append(customer);
        }
    });
})
