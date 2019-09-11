import React, { Component } from 'React';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Fonts } from '../utilts/Fonts'

const markerArray = [
    {
        longitude: 74.1005,
        latitude: 32.5731,
        locName: 'Gujrat'
    },
    {
        longitude: 74.3587,
        latitude: 31.5204,
        locName: 'Lahore'
    }
]

const WIDTH = Math.round(Dimensions.get('window').width); a = 2;

class Welcome extends Component {

    constructor() {
        super();
        this.addmarker = {
            latitude: null,
            longitude: null,
            locName: null
        }
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null
        }
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                })
            },
            error => this.setState({ error: alert(error.message) }),
            { enableHighAccuracy: true, timeout: 20000 }
        );
    }
    renderMarker = () => {
        console.log('array: ', markerArray)
        return markerArray.map((item, index) => {
            return (
                <Marker key={index} coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
            )
        })
    }
    renderMarkerArray() {
        console.log('longitude: ', this.addmarker.longitude, ' and latitude : ', this.addmarker.longitude, '\n and name : ', this.addmarker.locName)
        if (!(this.addmarker.longitude == null || this.addmarker.longitude == null || this.addmarker.locName == null)) {
            markerArray.push({
                longitude: this.addmarker.longitude,
                latitude: this.addmarker.latitude,
                locName: this.addmarker.locName
            }
            ), this.componentDidMount()
            
        }
        else {
            alert('Please enter correct data')
            
        }
        // a=1
        // for(i=0; i<=markerArray.length ; i++){
        //     console.log(i)
        //     console.log('hi',markerArray[i])
        //     if(markerArray[i].longitude==this.addmarker.longitude && markerArray[i].latitude==this.addmarker.latitude){
        //         a=2;
        //         console.log('hi i am here',markerArray[i])
        //         break;
        //     }
        // }
        // if(a==1){

        // }else(
        //     alert('You already add Marker in this position')
        // )

    }
    showMarker() {
        return (
            <ScrollView style={{ height: 70, width: WIDTH - 30, marginLeft: 10, marginRight: 10, alignSelf: 'center' }}
                horizontal
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                pagingEnabled
                scrollEnabled
                decelerationRate={16}
                showsHorizontalScrollIndicator={false}>
                {markerArray.map((item, index) => (
                    <TouchableOpacity key={`marker-${index}`} onPress={() => { this.handleItem(item.latitude, item.longitude) }}>
                        <View style={styles.showMarkerStyle}>
                            <View style={{ flex: .7, justifyContent: 'center', marginleft: 15, borderRightWidth:  0.3, borderColor: 'gray',shadowOpacity: 2, }}>
                                <Text style={{ fontFamily: Fonts.BurlingameProRegular, fontSize: 18, alignSelf: 'center', color: 'gray' }}>ID : {index}</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection:'row', marginTop:5 }}>
                                <Text style={{marginLeft:10, fontFamily: Fonts.BurlingameProSemiBold, fontSize: 18 ,  }}>
                                    Latitude: {'\n'}
                                    Longitude:
                                </Text>
                                <Text style={{marginLeft:5, fontFamily: Fonts.BurlingameProRegular, fontSize: 18 }}>
                                     {item.latitude} {'\n'}
                                     {item.longitude}
                                </Text>
                            </View>
                            <View style={{alignSelf:'flex-end'}}>
                                <Text style={{fontFamily:Fonts.BurlingameProSemiBold, fontSize:10, color:'gray'}}>
                                    {item.locName}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                ))}

            </ScrollView>
        )
    }


    handleItem = (lat, lng) => {
        this.setState({ latitude: lat, longitude: lng })
        this.map.animateToCoordinate({ latitude: lat, longitude: lng }, 1000)
    }
    render() {
        console.log('hi')
        return (
            <View style={styles.mainContainer} >
                <View style={styles.mapStyle}>
                    <MapView style={{ flex: 1 }}
                        ref={map => this.map = map}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={this.state} />
                        {this.renderMarker()}
                    </MapView>
                </View>
                <View style={styles.dataStyle}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }} >
                            <TextInput
                                placeholder='Enter Latitude'
                                placeholderTextColor={'gray'}
                                underlineColorAndroid='transparent'
                                style={styles.inputStyle}
                                onChangeText={text => this.addmarker.latitude = parseFloat(text)} />
                            <TextInput
                                placeholder='Enter Longitude'
                                placeholderTextColor={'gray'}
                                underlineColorAndroid='transparent'
                                style={styles.inputStyle}
                                onChangeText={text => this.addmarker.longitude = parseFloat(text)} />
                        </View>
                        <View>
                            <TextInput
                                placeholder='Enter Location Name'
                                placeholderTextColor={'gray'}
                                underlineColorAndroid='transparent'
                                style={styles.inputStyleName}
                                onChangeText={text => this.addmarker.locName = text} />
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => (this.renderMarkerArray())}>
                                <View style={{ marginTop: 5, backgroundColor: '#007aff', alignSelf: 'flex-end', borderRadius: 3 }}>
                                    <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 25, color: 'white' }}>
                                        ADD MARKER
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View>
                        <View style={{ marginTop: 10, alignSelf: 'center', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, color:'#E51C24' }}>YOUR MARKERS</Text>
                        </View>

                        {this.showMarker()}
                    </View>
                </View>
            </View>
        );

    }
}
const styles = {
    mainContainer: {
        flex: 1,
    },
    mapStyle: {
        flex: 4,
    },
    dataStyle: {
        flex: 3
    },
    inputStyle: {
        marginTop: 10,
        paddingLeft: 10,
        width: WIDTH - 200,
        height: 40,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: 'black',
        borderColor: 'gray',
        shadowOpacity: 2,
        borderRadius: 3,
        borderWidth: 0.3,
        marginHorizontal: 10
    },
    inputStyleName: {
        marginTop: 10,
        paddingLeft: 10,
        width: WIDTH - 55,
        height: 40,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: 'black',
        borderColor: 'gray',
        shadowOpacity: 2,
        borderRadius: 3,
        borderWidth: 0.3,
        marginHorizontal: 25
    },
    showMarkerStyle: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        height: 60,
        width: WIDTH - 30,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: 'black',
        borderColor: 'gray',
        shadowOpacity: 2,
        borderRadius: 3,
        borderWidth: 0.3,
        // marginLeft:10,
        // marginRight:10
        //marginHorizontal: 25
    }
}


export default Welcome