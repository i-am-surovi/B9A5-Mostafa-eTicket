// Global variables

const menuBtn = document.getElementById('menu-btn');
const mobile_menu = document.querySelector('#mobileMenu');
const selectedSeat = document.getElementById('selected-seat');
const total_ticket_booked = document.querySelector('#total-booked');
const availableSeat = document.getElementById('available-seat');
const total_price = document.getElementById('total-price');
const couponInput = document.getElementById('coupon-field');
const couponBtn = document.getElementById('coupon-btn');
const defaultText = document.getElementById('default-text');
const grand_total = document.getElementById('grand-total');
const nextBtn = document.getElementById('next-btn');
const passengerName = document.getElementById('name-passenger');
const phoneNumber = document.getElementById('phone-number');
const emailAddress = document.getElementById('email-address');

// Click menu

menuBtn.addEventListener('click', function(){
    menuBtn.children[0].classList.toggle('hidden');
    const menuClose = document.getElementById('close-icon');

    menuClose.classList.toggle('hidden');
    mobile_menu.classList.toggle('hidden');
    mobile_menu.classList.toggle('flex');
});

// Seat booking content

let seatName = [];
let totalPrice = 0;

function selectSeat(event){

    let value = event.innerText;

    if(seatName.includes(value)){
        return alert('Seat already booked!');
    }

    else if(seatName.length < 4){
        event.classList.add('bg-primary');
        event.classList.add('text-white');
    
        seatName.push(event.innerText);
        total_ticket_booked.innerText = seatName.length;
    
        // Decrease available seat
    
        const availableSeatText = parseFloat(availableSeat.innerText);
        const newSeatValue = availableSeatText - 1;
        availableSeat.innerText = newSeatValue;

        // Hide Default text
    
        defaultText.classList.add('hidden');
    
       selectedSeat.innerHTML += `
       <li class="text-base font-medium flex justify-between">
       <span>${event.innerText}</span>
       <span>Economy</span>
       <span>৳550</span>
       </li>
       `

        // Update total price
    
        totalPrice += 550;
        total_price.innerText = totalPrice.toFixed(2);
    
        // Active Coupon content
    
        if(seatName.length > 3){
            couponInput.removeAttribute('disabled');
            couponBtn.removeAttribute('disabled');
        }
    }
    else{
        alert('Maximum seat booked!');
        return;
    }
}

// Event of coupon button

document.getElementById('coupon-btn').addEventListener('click', function(){
    let couponSave = 0;
    const couponFieldValue = couponInput.value;

    if(couponFieldValue !== "NEW50" && couponFieldValue !== "Couple 20"){
        alert('Your provided coupon is not valid!');
        return;
    }

    if(couponFieldValue === 'NEW50'){
        couponSave = totalPrice * .15;
    }

    else if(couponFieldValue === 'Couple 20'){
        couponSave = totalPrice * .20;
    }

    const showCouponPrice = document.getElementById('show-coupon-price');
    showCouponPrice.innerHTML = `
    <p>Discount</p>
    <p>
    <span>-BDT: </span>
    <span>${couponSave.toFixed(2)}</span>
    </p>
    `
    const grandTotalValue = totalPrice - couponSave;
    grand_total.innerText = grandTotalValue.toFixed(2);
});


// Enable Button

phoneNumber.addEventListener('keyup', function(event){
    const inputValue = event.target.value;
    if(inputValue.length >= 11){
        nextBtn.removeAttribute('disabled');
    }
});

document.getElementById('btn-continue').addEventListener('click', function(){
    window.location.reload();
});

couponBtn.addEventListener('click', function(){
        passengerName.removeAttribute('disabled');
        phoneNumber.removeAttribute('disabled');
        emailAddress.removeAttribute('disabled');
});