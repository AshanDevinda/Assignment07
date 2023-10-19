const db = [];

//order raw model
class OrderRaw {
    constructor(customer_id, order_id, date, item_id, item_name, price, qty) {
        this.customer_id = customer_id;
        this.order_id = order_id;
        this.date = date;
        this.item_id = item_id;
        this.item_name = item_name;
        this.price = price;
        this.qty = qty;
    }
}
// load all orders to table
function loadAll() {
    let total = 0.0;
    $("#po-table-body").empty();
    db.map((item, index) => {
        $("#po-table-body").append(`<tr><td class="customer-id">${item.customer_id}</td><td class="order-id">${item.order_id}</td><td class="date">${item.date}</td><td class="item-id">${item.item_id}</td><td class="item-name">${item.item_name}</td><td class="price">${item.price}</td><td class="qty">${item.qty}</td></tr>`);
        $("#total-lbl").text(total = parseFloat(total) + (parseFloat(item.price) * parseFloat(item.qty)));
    });
};
// clear inputs
function clearInputs() {
        // $("#po-customer-id").val(""),
        // $("#order-id").val(""),
        // $("#date").val(""),
        $("#po-item-id").val(""),
        $("#po-item-name").val(""),
        $("#po-price").val(""),
        $("#qty-on-hand").val(""),
        $("#po-qty").val("")
}
//add new order raw
$("#add-row").on('click', () => {
    let isBuying = isAlreadyBuying($("#po-item-name").val(),  $("#po-qty").val());
    if (!isBuying) {
        db.push(new OrderRaw(
            $("#po-customer-id").val(),
            $("#order-id").val(),
            $("#date").val(),
            $("#po-item-id").val(),
            $("#po-item-name").val(),
            $("#po-price").val(),
            $("#po-qty").val()
        ));
    }
    loadAll();
    clearInputs()
});
//add item for all ready buying item
function isAlreadyBuying(item_name, new_qty) {
    for(let i = 0; i < db.length; i++ ){
        if(db[i].item_name === item_name) {
            db[i].qty = parseInt(db[i].qty) + (parseInt(new_qty));
            return true;
        }
    }
    return false;
}
//click raw to inputs
let item_id;
$("#po-table-body").on("click", ("tr"), function () {
    $("#po-customer-id").val($(this).find(".customer-id").text());
    $("#order-id").val($(this).find(".order-id").text());
    $("#date").val($(this).find(".date").text());
    $("#po-item-id").val($(this).find(".item-id").text());
    $("#po-item-name").val($(this).find(".item-name").text());
    $("#po-price").val($(this).find(".price").text());
    $("#po-qty").val($(this).find(".qty").text());
    item_id = $(this).find(".item-id").text();
    console.log(item_id)
});
// update raw data
// $("#update-raw").on('click', () => {
//     db[db.findIndex(item => item.item_id ===  $("#item-id").val())] = new OrderRaw(
//             $("#po-customer-id").val(),
//             $("#order-id").val(),
//             $("#date").val(),
//             $("#po-item-id").val(),
//             $("#po-item-name").val(),
//             $("#po-price").val(),
//             $("#po-qty").val()
//         );
//     loadAll();
// });
//remove item raw
$("#remove-row").on('click', () => {
    db.splice(db.findIndex(item => item.item_id === item_id), 1);
    loadAll()
    clearInputs();
});

// order details for table
const items = [];
$("#place-order").on('click', () => {
    $("#po-table-body tr").each(function() {
            items.push($(this).find(".item-name").text());
    });
    $("#od-table-body").append(`<tr>
         <td>${$("#date").val()}</td>
         <td>${$("#po-customer-id").val()}</td>
         <td>${$("#order-id").val()}</td>
         <td>${items.join(",")}</td>
         <td>${$("#total-lbl").text()}</td>
</tr>`)
    $("#po-table-body").empty();
    items.length = 0;
    db.length = 0;
});
