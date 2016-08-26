//Business Logic
function Pizza(size,toppings,id){
  this.sizeOfpizza = size;
  this.toppings = toppings;
  this.price = 0;
  this.pizzaId = id;
}

function Customer(){
  this.customerName = "";
  this.address = "";
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

Customer.prototype.checkUserInputName = function(){
  if(!this.customerName) return false;
  else return true;
}

Customer.prototype.checkUserInputAmount = function(){
  if(this.pizzaAmount < 1) return false;
  else return true;
}

Customer.prototype.calculateBill = function(){
  this.bill += this.pizzas[this.pizzas.length-1].price;
}

Customer.prototype.amIDoneOrdering = function(){
  if(this.pizzas.length === this.pizzaAmount) return true;
  else return false;
}

Customer.prototype.reOrder = function(){
  this.customerName = "";
  this.address = "";
  this.pizzaAmount = 0;
  this.pizzas = [];
  this.bill = 0;
}

var checkUserInputAddress = function(street,city,state,zip){
  if(!street||!city||!state||!zip) return false;
  else return true;
}

//UI logic
Pizza.prototype.addToList = function(){
  if(!this.pizzaId){
    $("#main-column").removeClass("col-sm-12");
    $("#main-column").addClass("col-sm-7");
    $("#pizza-box").show();
  }
  if(!this.toppings.length)
  $("#pizza-list").append("<li class='temp-pizza' id='temp-pizza" + this.pizzaId + "'>" + this.sizeOfpizza +  " plain cheese " + " $" + this.price + ".00" +"</li><br>");
  else{
    $("#pizza-list").append("<li class='temp-pizza' id='temp-pizza" + this.pizzaId + "'>" + this.sizeOfpizza +  " " + this.toppings.length + " topping " + " $" + this.price + ".00" +"</li>");
    $("#temp-pizza"+ this.pizzaId).append("<br>Toppings:<ul id=toppings" + this.pizzaId + "></ul>");
    for (var i = 0; i < this.toppings.length; i++) {
      $("#toppings"+ this.pizzaId).append("<li>" + this.toppings[i] + "</li>");
    }
    $("#toppings"+ this.pizzaId).append("<br>");
  }
}

var clearFields = function(){
  $("#name").val("");
  $("#pizza-amount").val(1);
  $("#street").val("");
  $("#city").val("");
  $("#state").val("");
  $("#zip").val("");
}

$(document).ready(function() {
  var myCustomer = new Customer();
  $("form#customer").submit(function(event){
    event.preventDefault();
    myCustomer.customerName = $("#name").val();
    myCustomer.pizzaAmount = parseInt($("#pizza-amount").val());
    if(!myCustomer.checkUserInputName()){
      alert("Please enter your name");
      return;
    }
    if(!myCustomer.checkUserInputAmount()){
      alert("You can't eat 0 or a negative number pizzas!");
      return;
    }
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
    var myPizza = new Pizza(size,toppings,myCustomer.pizzas.length);
    myCustomer.pizzas.push(myPizza);
    myPizza.calculateCost();
    myPizza.addToList();
    myCustomer.calculateBill();
    if(myCustomer.amIDoneOrdering()){
      $(this).hide();
      $("#total").text("Your total is $" + myCustomer.bill + ".00");
      $("#order").show();
    }
  });
  $("form#order").submit(function(event){
    event.preventDefault();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    if(!checkUserInputAddress(street,city,state,zip)){
      alert("Please enter all fields so we can find you!");
      return;
    }
    myCustomer.address = street + " " + city + ", " + state + ", " + zip;
    alert("Your pizza(s) wil arrive at "+ myCustomer.address +" in 30 min. Thank you for your order " + myCustomer.customerName + " we appreciate your business!");
    $(".temp-pizza").remove();
    $(this).hide();
    $("#customer").show();
    $("#main-column").addClass("col-sm-12");
    $("#main-column").removeClass("col-sm-7");
    $("#pizza-box").hide();
    myCustomer.reOrder();
    clearFields();
  });
});
