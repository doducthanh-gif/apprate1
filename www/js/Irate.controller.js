function ReqAllData() {
    const data_restaurant = ReqData1();
    data_restaurant.onsuccess = (event) => {
        const dataRes = event.target.result
        for (var i in dataRes.reverse()) {
            let html = `
            <div>
                <div class="single-food">
                    <div class="food-img">
                        <img src="${dataRes[i].r_image}" class="img-fluid" alt="">
                    </div>
                    <div class="food-content">
                        <div class="d-flex justify-content-between">
                            <h5>${dataRes[i].r_name}</h5>
                            <span class="style-change"><span>${parseFloat((Number(dataRes[i].rate_service_point) + Number(dataRes[i].rate_clean_point) + Number(dataRes[i].rate_food_point))/3).toFixed(1)}</span> <span><i class="fa fa-star"></i></span></span>
                        </div>
                        <p class="pt-3">${dataRes[i].r_description}</p>
                    </div>
                    <div class="food-footer">
                        <button id="ReqDeleteData" rateId="${dataRes[i].id}" type="button" class="btn btn-primary">Delete</button> 
                        <button id="ReqDetailsData" rateId="${dataRes[i].id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailRestaurant">Details</button> 
                    </div>
                </div>
            </div>
            <br>      
            `
            $('#restaurants').append(html);
        }
    }
};
$(window).on("load", function() {
    ReqAllData()
});
$(document).ready(function() {
    $('#index').on('click', function() {
        $('#restaurants').empty()
        ReqAllData()
    })
    $(document).on('submit', '#feedback', function() {
        const feedback = {
            r_name: $('#r_name').val(),
            r_type: $('#r_type').val(),
            r_address: $('#r_address').val(),
            rate_service_point: $('#rate_service_point').val(),
            rate_clean_point: $('#rate_clean_point').val(),
            rate_food_point: $('#rate_food_point').val(),
            r_cost: $('#r_cost').val(),
            r_datetime: $('#r_datetime').val(),
            r_description: $('#r_description').val(),
            r_image: 'img/food6.jpg'
        }
        ReqAddData(feedback)
        return false
    })
    $(document).on('click', '#ReqDeleteData', function() {
        const rateid = $(this).attr("rateId")
        const result = ReqDeleteData(rateid)
        result.onsuccess = function() {
            navigator.notification.beep(1);
            navigator.vibrate(100)
            $('#restaurants').empty()
        }
        result.onerror = function() {
            alert("Failed to delete")
        }
        return ReqAllData()
    })

    $(document).on('click', '#ReqDetailsData', function() {
        const rateId = $(this).attr("rateId")
        const result = ReqDetailsData(rateId)
        result.onsuccess = function(event) {
            $(location).attr('href', "#detail")
            const reqDetailsData = event.target.result
            const html = `
            <div class="modal-dialog" role="document">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${reqDetailsData.r_name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img src="${reqDetailsData.r_image}" style="max-width:400px; heigh: auto; width:100%;"></img>
                        <p>${reqDetailsData.r_name}</p>
                        <p>Type: ${reqDetailsData.r_type}</p>
                        <p>Address: ${reqDetailsData.r_address}</p>
                        <p>Average cost: ${reqDetailsData.r_cost}</p>
                        <p>Service: ${reqDetailsData.rate_service_point}</p>
                        <p>Food: ${reqDetailsData.rate_food_point}</p>
                        <p>Clean: ${reqDetailsData.rate_clean_point}</p>
                        <p>Average Rating: <span>${parseFloat((Number(reqDetailsData.rate_service_point) + Number(reqDetailsData.rate_clean_point) + Number(reqDetailsData.rate_food_point))/3).toFixed(1)}</span> <span><i class="fa fa-star"></i></span></p>
                        <p>Date and time: ${reqDetailsData.r_datetime}</p>
                        <p>Descriptions: ${reqDetailsData.r_description}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            `
            $('#detailRestaurant').empty().append(html)
        }
    })
})