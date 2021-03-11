import { useTheme } from '@/Theme'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button } from '@/Components'
import { useSelector } from 'react-redux'
import { navigate } from '@/Navigators/Root'

const SettingsDeviceConnectionContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const intentionId = useSelector((state) => state.intention).intention.settingsDeviceConnection;

    const continueCallback = () => {
        if (intentionId === 1) {
            navigate("SettingsDevicePassword", {});
        }
        else if (intentionId === 2) {
            navigate("SettingsDeviceWifi", {});
        }
        else {
            throw "Unknown intentionId!";
        }
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MyDevice"} previousView={"Settings"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlTMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={[Fonts.listFileName, Fonts.textCenter]}>connect to your CloudLockr device via Bluetooth to proceed with configuration</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.detailBold}>CloudLockr Device Status:</Text>
                        <Text style={Fonts.detail}>Configured and Connected</Text>
                    </View>
                </View>
                <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largexxlBPadding]}>
                    <Button title={"continue"} clickCallback={continueCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                </View>
            </View>
        </View>
    )
}

export default SettingsDeviceConnectionContainer;