// Make a NDWI map of your Upazila by using Sentinel-2 imagery for 2023. 
// Upload the code, code link, and screenshot in your GitHub repo. Submit the repo link.


print(roi.first())

var upazila = roi.filter(ee.Filter.eq("NAME_3","Fatikchhari"))
print(upazila)
Map.addLayer(upazila,{}, "Fatikchhari")
// Map.centerObject(upazila)
        
var s2= ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(roi)
        .filterDate('2023-01-01', '2023-01-30')
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE",20))
        .first()
        .select(["B2","B4","B3","B8"])
       
Map.addLayer(s2.clip(roi),{},"RGB image")
print(s2)
var ndwi = s2.normalizedDifference(["B3","B8"]).rename("NDWI")
print(ndwi,"ndwi image")
var vizParam = {
  min: -1,
  max: 1,
  palette: ["blue","cyan","green"]
}
Map.addLayer(ndwi.clip(roi),vizParam,"NDWI image")
