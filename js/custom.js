document.addEventListener('DOMContentLoaded', function() {

  // ingredients
  var ingredients = document.querySelectorAll('.ingredients-section');
  var foodList = document.querySelectorAll('[data-food-item]');

  for (var i=0; i < foodList.length; i++) {
    foodList[i].addEventListener('click', changeIngredients);
  }

  function changeIngredients(e) {
    var currentIndex = this.dataset.item;

    for (var i=0; i < foodList.length; i++) {
      foodList[i].classList.remove('active');
    }

    this.classList.add('active');

    for (var j=0; j < ingredients.length; j++) {

      if (ingredients[j].dataset.section === currentIndex) {
        var currentIngredient = ingredients[j];

        currentIngredient.classList.add('active', 'fade-in');

        if (this.parentElement.classList.contains('foods-list')) {
          document.querySelector('.foods-list-mobile li[data-item="' + currentIndex + '"]').classList.add('active');
        }
        if (this.parentElement.classList.contains('foods-list-mobile')) {
          document.querySelector('.foods-list li[data-item="' + currentIndex + '"]').classList.add('active');
        }
        
        setTimeout(function() {
          currentIngredient.classList.remove('fade-in');
        }, 500);
      } else {
        ingredients[j].classList.remove('active', 'fade-in');
      }
    }
  }

  // scroll to about button
  document.querySelector('#scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    
    var scrollToAbout = window.setInterval(function() {
      var i = window.pageYOffset;
      var positionGoalTop = document.querySelector('#about').offsetTop;
      var positionCurrent = document.querySelector('#about').getBoundingClientRect().top;

      if (positionCurrent > 30) {
        window.scrollTo(0, i + 30);
      } else if ( (positionCurrent > 0) && (positionCurrent <= 30) ) {
        window.scrollTo(0, positionGoalTop);
      } else {
        window.clearInterval(scrollToAbout);
      }
    }, 16);
  });

  // scroll to options button
  document.querySelector('#scroll-options').addEventListener('click', function(e) {
    e.preventDefault();
    
    var scrollToOptions = window.setInterval(function() {
      var i = window.pageYOffset;
      var positionGoalTop = document.querySelector('#options').offsetTop;
      var positionCurrent = document.querySelector('#options').getBoundingClientRect().top;

      if (positionCurrent < -80) {
        window.scrollTo(0, i - 80);
      } else if ( (positionCurrent >= -60) && (positionCurrent <= 0) ) {
        window.scrollTo(0, positionGoalTop - 20);
      } else {
        window.clearInterval(scrollToOptions);
      }
    }, 16);
  });

  // choose options
  var purchaseConfig = [
		{
			name: "One-Time Purchase",
			slogan: "",
			items: [
				{
					name: "Single Pack",
					price: "£39.95",
					save: "You Save 20%",
					discountFrom: "£49.95",
					savings: "£10.00",
					link: "/links-rr-c/exit1.php"
				},
				{
					name: "Three Pack",
					price: "£109.85",
					save: "You Save 26%",
					discountFrom: "£149.85",
					savings: "£40.00",
					link: "/links-rr-c/exit2.php"
				},
				{
					name: "Six Pack",
					price: "£201.42",
					save: "You Save 32%",
					discountFrom: "£299.70",
					savings: "£98.28",
					link: "/links-rr-c/exit3.php"
				},
			]
		},
		{
			name: "Subscribe & Save",
			slogan: "Save up to 35% OFF",
			items: [
				{
					name: "Single Pack",
					price: "£34.95",
					save: "You Save 30%",
					discountFrom: "£49.95",
					savings: "£15.00",
					link: "/links-rr-c/exit4.php"
				},
				{
					name: "Three Pack",
					price: "£100.90",
					save: "You Save 32%",
					discountFrom: "£149.85",
					savings: "£48.95",
					link: "/links-rr-c/exit5.php"
				},
				{
					name: "Six Pack",
					price: "£193.95",
					save: "You Save 35%",
					discountFrom: "£299.70",
					savings: "£105.75",
					link: "/links-rr-c/exit6.php"
				},
			]
		},
	];

	var cartOptions = document.querySelectorAll(".price-type .price-type__header");
	var allCartBodies = document.querySelectorAll(".price-type__body");

	for (var i = 0; i < cartOptions.length; i++) {
		var config = purchaseConfig[i];

		cartOptions[i].querySelector('.option-heading').innerHTML = config.name;

		var subElements = cartOptions[i].parentNode.querySelectorAll('.inner-option');

		for (var k = 0; k < subElements.length; k++) {
			var li = subElements[k];

			li.querySelector('.option-name').innerHTML = config['items'][k].name;
			li.querySelector('.price-save').innerHTML = config['items'][k].save;

			li.querySelector('.radio-option').setAttribute('data-price', config['items'][k].price);
			li.querySelector('.radio-option').setAttribute('data-discount', config['items'][k].discountFrom);
			li.querySelector('.radio-option').setAttribute('data-save', config['items'][k].save);
			li.querySelector('.radio-option').setAttribute('data-savings', config['items'][k].savings);
			li.querySelector('.radio-option').setAttribute('data-link', config['items'][k].link);
		}

		cartOptions[i].addEventListener('click', function (e) {
			for (var j = 0; j < cartOptions.length; j++) {
				cartOptions[j].classList.remove('active');
			}
			this.classList.add('active');
			for (var z = 0; z < allCartBodies.length; z++) {
				allCartBodies[z].style.display = 'none';
			}
			this.parentElement.querySelector('.price-type__body').style.display = 'block';
			this.parentElement.querySelector('.price-type__body').querySelectorAll('li')[0].click();
		});
	}

	var allOptionSelections = document.querySelectorAll('.body-list li');

	for (var i = 0; i < allOptionSelections.length; i++) {
		allOptionSelections[i].addEventListener('click', function (e) {
			for (var j = 0; j < allOptionSelections.length; j++) {
				allOptionSelections[j].classList.remove('active');
			}
			this.classList.add('active');
			configureExit(this.querySelector("input"));
		});
	}

	function configureExit(item) {
    item.parentElement.parentElement.parentElement.nextElementSibling.querySelector('.original-price').innerHTML = item.getAttribute('data-discount');
		item.parentElement.parentElement.parentElement.nextElementSibling.querySelector('.saving-price').innerHTML = item.getAttribute('data-savings');
    item.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.querySelector('.current-price').innerHTML = item.getAttribute('data-price');

		var exitLinks = document.querySelectorAll('.exit-link');

		for (var j = 0; j < exitLinks.length; j++) {
			exitLinks[j].setAttribute('href', item.getAttribute('data-link'));
		}
	}

	var radios = document.getElementsByName('radio-group2');
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			radios[i].click();
			break;
		}
	}

})