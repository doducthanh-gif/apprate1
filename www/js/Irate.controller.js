function ReqAllData() {
    const data_restaurant = ReqData("APPDATA_DB");
    res.onsuccess = (event) => {
        const dataRes = event.target.result
        for (var i in dataRes.reverse()) {
            let html =`
            <div class="col-md-4 col-sm-6">
                <div class="single-food">
                    <div class="food-img">
                        <img src="${dataRes[i].id}" class="img-fluid" alt="">
                    </div>
                    <div class="food-content">
                        <div class="d-flex justify-content-between">
                            <h5>${dataRes[i].id}</h5>
                            <span class="style-change">${dataRes[i].id}</span>
                        </div>
                        <p class="pt-3">${dataRes[i].id}</p>
                        <p class="pt-3">
                            <div class="container">
                                <button class="btn">Delete</button><button class="btn">Rate</button>  
                              </div>
                        </p>
                    </div>
                </div>
            </div>      
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
        home()
    })
    $('#feedback').on('submit', function (){
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
            r_image: 'img/res.png'
        }
        AddRes("APPDATA_DB", feedback)
        return false
    })
    // $(document).on('click', '#DeleteRes', function() {
    //     const rateid = $(this).attr("rateId")
    //     const result = DeleteRes(rateid)
    //     result.onsuccess = function() {
    //         navigator.notification.beep(1);
    //         navigator.vibrate(100)
    //         $('#listrest').empty()
    //     }
    //     result.onerror = function() {
    //         alert("Failed to delete")
    //     }
    //     return  home()
    // })

    // $(document).on('click', '#GetDetailsRes', function() {
    //     const rateId = $(this).attr("rateId")
    //     const result = GetDetailsRes(rateId)
    //     result.onsuccess = function(event) {
    //         $(location).attr('href', "#detail")
    //         const Restaurant_Detail = event.target.result
    //         const html = `
    //         <div class="modal-dialog" role="document">
    //             <div class="">
    //             <div class="modal-header">
    //                 <h5 class="modal-title" id="exampleModalLabel">${Restaurant_Detail.Restaurant_Name}</h5>
    //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                 <span aria-hidden="true">&times;</span>
    //                 </button>
    //             </div>
    //             <div class="modal-body">
    //                 <h4 class="card-title">${Restaurant_Detail.Restaurant_Name}</h4>
    //                 <p class="card-text">${Restaurant_Detail.Restaurant_Type}</p>
    //             </div>
    //             <div class="modal-footer">
    //                 <button type="submit" class="btn btn-secondary" data-dismiss="modal" href="#homepage">Close</button>
    //             </div>
    //             </div>
    //         </div>
    //         `
    //         $('#detail').empty().append(html)
    //     }
    // })
})