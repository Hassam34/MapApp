import React, { Component } from 'React';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Modal } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Fonts } from '../utilts/Fonts'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/AntDesign'
// import Icon4 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';
import Loader from './common/Loader'

const HEIGHT = Math.round(Dimensions.get('window').height)
const WIDTH = Math.round(Dimensions.get('window').width); a = 2;



class Welcome extends Component {

    constructor() {
        super();
        this.addmarker = {
            latitude: null,
            longitude: null,
            locname: null
        }
        this.state = {
            updLocName: '',
            updlatitude: 0,
            updlongitude: 0,
            cordinates: [],
            latitude: 0,
            longitude: 0,
            error: null,
            modalOK: null,
            modalValue: {},
            editModal: null,
            isLoading: false
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
        this.fetchingApi();
    }
    fetchingApi() {
        this.setState({ isLoading: true }, () => { console.log('component loader : ', this.state.isLoading) })
        axios.get('http://192.168.0.196:8080/api/cordinates/')
            .then(response => { this.setState({ cordinates: response.data.data, isLoading: false }) })
            .catch(err => console.log('error is : ', err))

       
    }
    renderMarker = () => {
        
        return this.state.cordinates.map((item, index) => {
            return (
                <Marker key={index} coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
            )
        })
    }
    renderMarkerArray() {
        bool = false
        if (!(this.addmarker.longitude == null || this.addmarker.longitude == null || this.addmarker.locname == null)) {
            this.state.cordinates.forEach(element => {
                if (parseFloat(element.longitude) == this.addmarker.longitude && parseFloat(element.latitude) == this.addmarker.latitude) {
                    bool = true;
                }
            });
            if (bool == false) {
                this.setState({ isLoading: true })
                axios.post('http://192.168.0.196:8080/api/cordinates/', this.addmarker)
                .then(()=> this.setState({isLoading:false})).then(()=>this.fetchingApi())
                .catch((err)=>(this.setState({isLoading:false}),alert(err)))
            }
            else {
                alert('You already have added these Marker in these cordinate')
            }
        }
        else {
            alert('Please enter correct data')

        }

    }
    showModal = () => {

        const item = this.state.modalValue
      
       // console.log('in modal: ', item, ' status: ', this.state.modalOK)

        return (
            <Modal transparent={true} visible={this.state.modalOK}>
                <View style={{flex:1, width: WIDTH - 20, alignSelf: 'center',marginTop:'50%', marginBottom:'50%', marginTop: 100, marginLeft: 20, marginRight: 20,  backgroundColor:'#F0FEF5',borderColor:'black', borderWidth:2, borderRadius: 10 }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} onPress={() => (this.setState({ modalOK: false, editModal: false }))}>
                        <Icon2 name='close' color="#007aff" size={25} />
                    </TouchableOpacity>
                    <View >
                        <View style={{ marginTop: 30, flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ marginLeft: 10, fontFamily: Fonts.BurlingameProSemiBold, fontSize: 18, }}>
                                    Location :
                                </Text>
                                <Text style={{ marginTop: 30, marginLeft: 10, fontFamily: Fonts.BurlingameProSemiBold, fontSize: 18, }}>
                                    Latitude :
                                </Text>
                                <Text style={{ marginTop: 30, marginLeft: 10, fontFamily: Fonts.BurlingameProSemiBold, fontSize: 18, }}>
                                    Longitude :
                                </Text>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                {this.state.editModal
                                    ?
                                    <TextInput
                                        //keyboardType='decimal-pad'
                                        placeholder='Enter new location Name'
                                        placeholderTextColor={'gray'}
                                        underlineColorAndroid='transparent'
                                        style={styles.inputStyleEdit}
                                       value={this.state.updLocName}
                                        onChangeText={text => this.setState({ updLocName: text })}
                                    //this.setState({ myArray: [...this.state.myArray, 'new value'] })
                                    />
                                    :
                                    <Text style={{ marginLeft: 5, fontFamily: Fonts.BurlingameProRegular, fontSize: 18 }}>
                                        {item.locname}
                                    </Text>
                                }
                                {this.state.editModal
                                    ?
                                    <TextInput
                                        keyboardType='decimal-pad'
                                        placeholder='Enter new Latitude'
                                        placeholderTextColor={'gray'}
                                        underlineColorAndroid='transparent'
                                        style={[styles.inputStyleEdit, { marginTop: 10 }]}
                                        //value={(this.state.latitude).toString()}
                                        onChangeText={text => this.setState({ updlatitude: parseFloat(text) })}
                                    />
                                    :
                                    <Text style={{ marginTop: 30, marginLeft: 5, fontFamily: Fonts.BurlingameProRegular, fontSize: 18 }}>
                                        {item.latitude}
                                    </Text>
                                }
                                {this.state.editModal
                                    ?
                                    <TextInput
                                        keyboardType='decimal-pad'
                                        placeholder='Enter new Longitude'
                                        placeholderTextColor={'gray'}
                                        underlineColorAndroid='transparent'
                                        style={[styles.inputStyleEdit, { marginTop: 10 }]}
                                       //value={(this.state.longitude).toString()}
                                        onChangeText={text => this.setState({ updlongitude: parseFloat(text) })}
                                    />
                                    :
                                    <Text style={{ marginTop: 30, marginLeft: 5, fontFamily: Fonts.BurlingameProRegular, fontSize: 18 }}>
                                        {item.longitude}
                                    </Text>
                                }
                            </View>
                        </View>
                        <View style={{ marginTop: 40 }}>

                            {this.state.editModal
                                ?
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => (this.updatecordinates(item), this.setState({ editModal: false }))}>
                                    <View style={{ marginTop: 5, backgroundColor: '#007aff', alignSelf: 'flex-end', borderRadius: 3 }}>
                                        <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 25, color: 'white' }}>
                                            Update Cordinates
                                </Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => (this.setState({ editModal: true }))}>
                                    <View style={{ marginTop: 5, backgroundColor: '#007aff', alignSelf: 'flex-end', borderRadius: 3 }}>
                                        <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 25, color: 'white' }}>
                                            Edit Cordinates
                                </Text>
                                    </View>
                                </TouchableOpacity>
                            }

                        </View>

                    </View>
                    <View style={{ alignSelf:'flex-end' , marginTop:10, marginRight:20 }}>
                            <TouchableOpacity onPress={()=> this.deleteCordinate(item)}>
                                   <Icon3 name='delete' color='red' size={25}/>
                            </TouchableOpacity>
                        </View>
                </View>
            </Modal>)
    }
    updatecordinates(item) {
          const upArray =
        {
            locname: this.state.updLocName,
            latitude: this.state.updlatitude,
            longitude: this.state.updlongitude
        }
        this.setState({ isLoading: true })
        axios.put(`http://192.168.0.196:8080/api/cordinates/${item._id}`, upArray)
            .then(()=>this.setState({ modalOK: false, })).then(()=> this.fetchingApi())
            .catch((err) => (this.setState({ modalOK: false, }),alert('Error to Update')));

    }
    deleteCordinate(item){
        this.setState({ isLoading: true })
        axios.delete(`http://192.168.0.196:8080/api/cordinates/${item._id}`)
            .then(()=>this.setState({ modalOK: false, })).then(()=> this.fetchingApi())
            .catch((err) => (this.setState({ modalOK: false, }),alert('Error to Delete')));
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
                {this.state.cordinates.map((item, index) => (
                    <TouchableOpacity key={`marker-${index}`} onPress={() => { this.handleItem(item.latitude, item.longitude) }}>
                        <View style={styles.showMarkerStyle}>
                            <View style={{ flex: .7, justifyContent: 'center', marginleft: 15, borderRightWidth: 0.3, borderColor: 'gray', shadowOpacity: 2, }}>
                                <Icon2 name='map-marker-alt' size={30} color='red' style={{alignSelf:'center', backgroundColor:'black', borderRadius:100 }}/>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ marginLeft: 10, fontFamily: Fonts.BurlingameProSemiBold, fontSize: 18, }}>
                                    Latitude: {'\n'}
                                    Longitude:
                                </Text>
                                <Text style={{ marginLeft: 5, fontFamily: Fonts.BurlingameProRegular, fontSize: 18 }}>
                                    {item.latitude} {'\n'}
                                    {item.longitude}
                                </Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Text style={{ fontFamily: Fonts.BurlingameProSemiBold, fontSize: 10, color: 'gray' }}>
                                    {item.locname}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => (this.setState({ modalOK: true, modalValue: item, updLocName:item.locname,updlatitude:item.locname,updlongitude:item.longitude }))}>
                                <View style={{ alignSelf: 'flex-end' }} >
                                    <Icon name='more-vertical' color='gray' size={30} />
                                </View>
                            </TouchableOpacity>
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

        //console.log('api data: ',this.state.cordinates)
        console.log('hi:  ', this.state.isLoading)
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
                                keyboardType='decimal-pad'
                                placeholder='Enter Latitude'
                                placeholderTextColor={'gray'}
                                underlineColorAndroid='transparent'
                                style={styles.inputStyle}
                                onChangeText={text => this.addmarker.latitude = parseFloat(text)} />
                            <TextInput
                                keyboardType='decimal-pad'
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
                                onChangeText={text => this.addmarker.locname = text} />
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
                            {
                            (this.state.cordinates).length>0
                            ?
                            (this.state.cordinates).length==1
                            ?
                            <Text style={{ fontSize: 15, color: '#E51C24' }}> YOUR MARKERS</Text>
                            :
                            <Text style={{ fontSize: 15, color: '#E51C24' }}> SWIPE TO SEE MORE MARKERS</Text>
                            :
                            <Text style={{ fontSize: 15, color: '#E51C24' }}>ADD MARKERS TO SEE YOUR MARKERS LIST</Text>
                            }
                            {/* <Text style={{ fontSize: 15, color: '#E51C24' }}>YOUR MARKERS</Text> */}
                        </View>

                        {this.showMarker()}
                        {this.showModal()}
                        <Loader loading={this.state.isLoading} />
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
    },
    inputStyleEdit: {
        // marginTop: 10,
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
    }
}


export default Welcome