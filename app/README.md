#Replace the diary with your own diary implementation -to Abhijith
# implement icons on the new home layout. 
#Implement calender using ns calender plugin (UI only)
#Refer Doc for 'My Eye' page
#My patient page will have a  list view with names of patients->on click show patient profile.
#Skip references
#Others page will have share button and the content sent on your mail (Disclaimer)

# Please add pushnotification suppport as such.
- Gradle might not build without these ..
- tns plugin add nativescript-push-notifications 
-- tns plugin add nativescript-calendar

add google play services from android studio sdk manager (extras).. 


push notifications wont test run on emulators as emulators usually do not have google play services installed. 
GCM only works on phones with google play services installed (most have)
On genymotion:
install ARM translator first.
then install Gapps.
update play servcies from app store.



//In future if we want to implement floating action button.. 
//Tested and failed to compile. avoid this. 
npm install ns(expand)-floatingactionbutton

plugin to provide an XML widget to implement the Material Design Floating Action Button in an Android app.

XML widget to create the Material Design Floating Action Button for Android NativeScript apps

Material Design Floating Action Button Spec
Installation

npm install nativescript-floatingactionbutton


Usage
XML
NOTE The sample XML here will position the FAB on top of the ListView. There is no need for absolute positioning.

<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded"
      xmlns:FAB="nativescript-floatingactionbutton">
    <Page.actionBar>
        <ActionBar title="Native FAB" backgroundColor="#3F51B5" color="#fff" />
    </Page.actionBar>
    <grid-layout rows="auto, *">
        <list-view row="1" items="{{ users }}">
            <list-view.itemTemplate>
                <label text="{{ name }}" textWrap="true" fontSize="18" margin="20" />
            </list-view.itemTemplate>
        </list-view>
        <android row="1">
            <FAB:fab tap="fabTap"
                             row="1"
                             icon="res://ic_add_white"
                             backColor="#ff4081"
                             rippleColor="#f1f1f1"
                             class="fab-button" />
        </android>
    </grid-layout>
</Page>

CSS

I recommend the following CSS styles.

.fab-button {
    height: 70;
    horizontal-align: right;
    vertical-align: bottom;
    margin: 15;
}

JS

function fabTap(args) {
    console.log('tapped');
}
exports.fabTap = fabTap;

Attributes

backColor - optional

Attribute to specify the background color of the FAB

rippleColor - optional

Attribute to set the ripple color on lollipop devices, it will fill the FAB on pre-lollipop devices

icon - required

Attribute to specify which icon to use for the FAB button, supports the same image source options that NativeScript images support.