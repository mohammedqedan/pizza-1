//Business Logic
function Pizza(size,toppings){
  this.sizeOfpizza = size;
  this.toppings = toppings;
  this.price = 0;
}
function Customer(name,pizzas){
  this.customerName = name;
  //this.address = address;
  this.pizzas = pizzas;
  this.bill = 0;
}

Pizza.prototype.calculateCost = function(){
  this.price = 10;
  if(this.sizeOfpizza === "medium"){
    this.price+=2;
  }
  else if (this.sizeOfpizza === "large"){
    this.price+=4;
  }
  for (var i = 1; i < this.toppings.length; i++) {
    this.price++;
  }
}
//UI logic
$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();
    var name = $("#name").val();
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input[name=toppings]:checked").each(function() {
      toppings.push(this.value);
    });
    var myPizza = new Pizza(size,toppings);
    var pizzas = [];
    pizzas.push(myPizza);
    var myCustomer = new Customer(name,pizzas)
    alert(myCustomer.pizzas[0].toppings);
    alert(myCustomer.pizzas[0].sizeOfpizza);
    myPizza.calculateCost();
    alert(myPizza.price);
  });

});
