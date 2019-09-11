import {createStackNavigator,createAppContainer} from 'react-navigation';
import Welcome from '../src/components/Welcome'

const stackNavigator=createStackNavigator({
    Welcome:{screen:Welcome},
},
{
    defaultNavigationOptions:{  
            headerStyle:{
                height:45
            },
            header: null,
            headerBackTitle:null
    }
}
)
const AppContainer=createAppContainer(stackNavigator);

export default AppContainer;