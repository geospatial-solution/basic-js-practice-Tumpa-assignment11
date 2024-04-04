// Calculate the maximum and minimum NDVI value of your NDVI map. 
// Upload the code, code link, and screenshot in your GitHub repo. Submit the repo link.
print(roi.first())

var upazila = roi.filter(ee.Filter.eq("NAME_3","Fatikchhari"))
print(upazila)
Map.addLayer(upazila,{}, "Fatikchhari")
// Map.centerObject(upazila)
        
var s2= ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(roi)
        .filterDate('2022-01-01', '2022-01-30')
        .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE",20))
        .first()
        .select(["B2","B4","B3","B8"])
       
Map.addLayer(s2.clip(roi),{},"RGB image")
print(s2)
var ndvi = s2.normalizedDifference(["B8","B4"]).rename("NDVI")
print(ndvi,"ndvi image")
var vizParam = {
  min: -1,
  max: 1,
  palette: ["blue","cyan","green"]
}
Map.addLayer(ndvi.clip(roi),vizParam,"NDVI image")

var stat = ndvi.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry:roi,
  scale: 10,
  bestEffort: true
})
print(stat)
