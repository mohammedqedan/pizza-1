//Business Logic
function Pizza(size,toppings){
  this.sizeOfpizza = size;
  this.toppings = toppings;
}
//UI logic
$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input[name=toppings]:checked").each(function() {
      toppings.push(this.value);
    });
    var myPizza = new Pizza(size,toppings);
    alert(myPizza.sizeOfpizza);
    alert(myPizza.toppings.length);
  });

});
