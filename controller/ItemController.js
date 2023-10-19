const db = [];

//item model
class ItemModel {
    constructor(item_id, item_name, price, qty) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.price = price;
        this.qty = qty;
    }
}
//clear inputs
function clearAddInputs() {
    $("#item_id").val("");
    $("#item-name").val("");
    $("#price").val("");
    $("#qty").val("");
};
//load all item to table
function loadAll() {
    $("#i-table-body").empty();
    db.map((item, index) => {
        let item_row = `<tr><td class="item-id">${item.item_id}</td><td class="item-name">${item.item_name}</td><td class="price">${item.price}</td><td class="qty">${item.qty}</td></tr>`;
        $("#i-table-body").append(item_row);
    })
}
//save item
$("#i-add-btn").on('click', () => {
    db.push(new ItemModel($("#item_id").val(), $("#item-name").val(), $("#price").val(), $("#qty").val()));
    loadAll();
    clearAddInputs();
});
//clicked raw set to input fields
let item_id;
$("#i-table-body").on('click', 'tr', function () {
    $("#item-id-u").val($(this).find(".item-id").text());
    $("#item-name-u").val($(this).find(".item-name").text());
    $("#price-u").val($(this).find(".price").text());
    $("#qty-u").val($(this).find(".qty").text());
    item_id = $(this).find(".item-id").text();
});
//update item
$("#i-update-btn").on('click', () => {
    db[db.findIndex(item => item.item_id === $("#item-id-u").val())] =  new ItemModel($("#item-id-u").val(), $("#item-name-u").val(),$("#price-u").val(), $("#qty-u").val());
    loadAll();
    clearAddInputs();
});
//remove item
$("#item-crudButtons>button[type='button']").eq(2).on('click', () => {
    db.splice(db.findIndex(item => item.item_id === item_id), 1);
    loadAll();
});
$("#item-crudButtons>button[type='button']").eq(3).on('click', () => {
    // loadAll();
});