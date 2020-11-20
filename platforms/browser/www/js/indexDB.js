const listRestaurants = [{
        r_name: "LA COLOMBLE",
        r_image: 'img/food1.jpg',
        r_type: 'Fast Food',
        r_address: 'Me Tri, Ha Noi',
        r_cost: 100,
        rate_service_point: 4,
        rate_clean_point: 4,
        rate_food_point: 4,
        r_datetime: "2020-07-07 9:00",
        r_description: "A cafe with memorable flavors. Just drink once and there will be a second time."
    },
    {
        r_name: "N Y D C",
        r_image: 'img/food2.jpg',
        r_type: 'Fast Food',
        r_address: 'Me Tri, Ha Noi',
        r_cost: 100,
        rate_service_point: 4,
        rate_clean_point: 4,
        rate_food_point: 4,
        r_datetime: "2020-07-07 9:00",
        r_description: "Fast food store with many cheap dishes and suitable for students."
    },
    {
        r_name: "Sundaes Coffee House",
        r_image: 'img/food3.jpg',
        r_type: 'Fast Food',
        r_address: 'Me Tri, Ha Noi',
        r_cost: 100,
        rate_service_point: 4,
        rate_clean_point: 4,
        rate_food_point: 4,
        r_datetime: "2020-07-07 9:00",
        r_description: "Caffe shop with relaxing corners and a great workspace."
    },
    {
        r_name: "Cong Ca Phe",
        r_image: 'img/food4.jpg',
        r_type: 'Fast Food',
        r_address: 'Me Tri, Ha Noi',
        r_cost: 100,
        rate_service_point: 4,
        rate_clean_point: 4,
        rate_food_point: 4,
        r_datetime: "2020-07-07 9:00",
        r_description: "Caffe shop with relaxing corners and a great workspace."
    },
]

var database1;
var request = window.indexedDB.open("Restaurant Database", 1);
request.onupgradeneeded = function(event) {
    var database1 = event.target.result;
    var objectStore = database1.createObjectStore("APPRATE_DB", { keyPath: "id", autoIncrement: true });
    for (var i in listRestaurants) {
        objectStore.add(listRestaurants[i])
    }
};


request.onsuccess = function(event) {
    database1 = request.result;
    console.log("success: " + database1);
};

function ReqData1() {
    const transaction = database1.transaction(["APPRATE_DB"], "readonly")
    const objectStore = transaction.objectStore("APPRATE_DB")
    request = objectStore.getAll();
    return request
};

function ReqAddData(data) {
    const reqAddData = database1.transaction(["APPRATE_DB"], "readwrite").objectStore("APPRATE_DB").add(data)
    reqAddData.onsuccess = () => {
        $('#submit').click(function() {
            $('#feedback').reset()
        })
        navigator.notification.beep(1);
        navigator.vibrate(100)
        alert("You Rated Successfully")
        $('#restaurants').empty()
        ReqAllData()
    }
    reqAddData.onerror = () => {
        alert('Error Rate')
    }
};

function ReqDetailsData(data) {
    const reqDetailsData = database1.transaction(["APPRATE_DB"], "readonly").objectStore("APPRATE_DB").get(Number(data))
    reqDetailsData.onerror = function() {
        alert("Error getting")
    }
    return reqDetailsData;
};

function ReqDeleteData(data) {
    reqDeleteData = Number(data)
    return database1.transaction(["APPRATE_DB"], "readwrite").objectStore("APPRATE_DB").delete(reqDeleteData)
};

function validateData() {
    var cost;
    var service;
    var clean;
    var food;

    cost = document.getElementById("r_cost").value;
    if (isNaN(cost) || cost < 1) {
        alert("Input AVG Cost not valid");
    }

    service = document.getElementById("rate_service_point").value;
    if (isNaN(service) || service < 1 || service > 5) {
        alert("Input Rate Service Point not valid");
    }
    clean = document.getElementById("rate_clean_point").value;
    if (isNaN(clean) || clean < 1 || clean > 5) {
        alert("Input Rate Clean Point not valid");
    }
    food = document.getElementById("rate_food_point").value;
    if (isNaN(food) || food < 1 || food > 5) {
        alert("Input Rate Food Point not valid");
    }
}