const listRestaurants = [
    {
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

var db1;
var request = window.indexedDB.open("Restaurant Database");
request.onupgradeneeded = function(event) {
    var db1 = event.target.result;
    var objectStore = db1.createObjectStore("APPRATE_DB", { keyPath: "id", autoIncrement: true });
    for (var i in listRestaurants) {
        objectStore.add(listRestaurants[i])
    }
};

request.onsuccess = function(event) {
    db1 = request.result;
    console.log("success: " + db1);
};

function ReqData(collectionName) {
    const transaction1 = db1.transaction([collectionName], "readonly")
    const objectStore = transaction1.objectStore(collectionName);
    reqData = objectStore.getAll();
    return reqData;
};

function ReqAddData(collectionName, data) {
    
};

function ReqDetailsData(data) {
    const detailsData = db1.transaction(["APPRATE_DB"], "readonly").objectStore("APPRATE_DB").get(Number(data))
    detailsData.onerror = function() {
        alert("Error getting")
    }
    return detailsData;
};

function ReqDeleteData(data) {
    deleteData = Number(data)
    return db1.transaction(["APPRATE_DB"], "readwrite").objectStore("APPRATE_DB").delete(deleteData)
};


