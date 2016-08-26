//Business Logic
function Pizza(size,toppings){
  this.sizeOfpizza = size;
  this.toppings = toppings;
  this.price = 0;
}
function Customer(){
  this.customerName = "";
  //this.address = address;
  this.pizzaAmount = 0;
  this.pizzas = [];
  this.bill = 0;
}

Pizza.prototype.calculateCost = function(){
  this.price = 10;
  if(this.sizeOfpizza === "Medium"){
    this.price+=2;
  }
  else if (this.sizeOfpizza === "Large"){
    this.price+=4;
  }
  for (var i = 1; i < this.toppings.length; i++) {
    this.price++;
  }
}
//UI logic
Pizza.prototype.addToList = function(){
  $("#pizza-list").show().append("<li>" + this.sizeOfpizza +  " " + this.toppings.length + " topping " + " $" + this.price + ".00" +"</li>");
}

var myCustomer = new Customer();
$(document).ready(function() {
  $("form#customer").submit(function(event){
    event.preventDefault();
    myCustomer.customerName = $("#name").val();
    myCustomer.pizzaAmount = parseInt($("#pizza-amount").val());
    $(this).hide();
    $("#pizza").show();
  });
  $("form#pizza").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input[name=toppings]:checked").each(function() {
      toppings.push(this.value);
    });
    var myPizza = new Pizza(size,toppings);
    myCustomer.pizzas.push(myPizza);
    myPizza.calculateCost();
    myPizza.addToList();
    myCustomer.bill += myPizza.price;
    if(myCustomer.pizzas.length === myCustomer.pizzaAmount){
      $(this).hide();
      $("#order").show();
    }
  });
  $("form#order").submit(function(event){
    event.preventDefault();
    alert("Your total is $" + myCustomer.bill + ".00");
  });
});
