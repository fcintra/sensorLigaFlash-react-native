import React, {useState, useEffect, useCallback} from "react";
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import Torch from "react-native-torch";
import RNShake from "react-native-shake";

const App = () =>{
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = useCallback(()=>{
    setToggle(oldToggle => !oldToggle)
  },[toggle])
  
  useEffect(()=>{
    //liga flash do celular
    Torch.switchState(toggle)
  },[toggle])
  
  useEffect(()=>{

    /*
    * Quando o celular for  chacoalhado o sistema irá mudar o toggle
    */
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle)
    });
    // essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove()
  },[])

  return (
  <View style={toggle ? style.containerLight : style.container}>
    <TouchableOpacity onPress={handleChangeToggle}>
        <Image style={toggle ? style.lightingOn : style.lightingOff}
          source={toggle ? require('./assets/icons/eco-light.png') : require('./assets/icons/eco-light-off.png')}/>

        <Image style={toggle ? style.dioLogo : style.dioLogo}
          source={toggle ? require('./assets/icons/logo-dio.png') : require('./assets/icons/logo-dio-white.png')}/>
    </TouchableOpacity> 
  </View>
  )
}

export default App

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
 
});