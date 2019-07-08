import wixLocation from 'wix-location';

$w.onReady(function () {
  $w("#dataset1").onAfterSave((itemBeforeSave, itemAfterSave) => {
    console.log(itemAfterSave);
    wixLocation.to("https://facekom.net/" + itemAfterSave['_id']);
  });
});
