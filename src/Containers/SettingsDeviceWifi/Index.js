import { useTheme } from "@/Theme";
import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  BasicHeader,
  Button,
  InputField,
  WifiList,
  ErrorAlert,
} from "@/Components";
import { navigate } from "@/Navigators/Root";
import { SetWifiNetworkService } from "@/Services/Device";
import Spinner from "react-native-loading-spinner-overlay";

const SettingsDeviceWifiContainer = () => {
  const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

  const confirmCallback = async () => {
    setSpinnerVisible(true);
    try {
      await SetWifiNetworkService(networkName, password);
      setSpinnerVisible(false);
      navigate("SettingsConfirmation", {});
    } catch (err) {
      setSpinnerVisible(false);
      ErrorAlert("Error Updating Configuration", err);
    }
  };

  const networkClickCallback = (clickedNetworkName) => {
    setConfirmedEnabled(true);
    setNetworkName(clickedNetworkName);
  };

  const passwordCallback = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const [networkName, setNetworkName] = useState("—— select network ——");
  const [password, setPassword] = useState("");
  const [confirmEnabled, setConfirmedEnabled] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("Processing Change");

  return (
    <View style={[Layout.fill, Layout.column]}>
      <Spinner
        visible={spinnerVisible}
        textContent={spinnerMessage}
        textStyle={{ color: Colors.white }}
      />
      <BasicHeader
        title={"Setup Wifi"}
        previousView={"SettingsDeviceConnection"}
      />
      <View style={[Layout.fill, Layout.justifyContentBetween]}>
        <View
          style={[
            Layout.column,
            Layout.center,
            Layout.fill,
            Layout.justifyContentBetween,
            Common.backgroundPrimary,
          ]}
        >
          <View style={[Layout.column, Layout.fill, Layout.fullWidth]}>
            <View style={[Layout.fill]}>
              <WifiList clickCallback={networkClickCallback} />
            </View>
          </View>
        </View>
        <View
          style={[
            Layout.column,
            Layout.center,
            Layout.justifyContentBetween,
            Gutters.regularVPadding,
            Common.backgroundSecondaryGreen,
          ]}
        >
          <View style={[Gutters.largexlHPadding, Layout.fullWidth]}>
            <Text style={[Fonts.detailFileName, Fonts.textCenter]}>
              Enter password for:
            </Text>
            <Text
              style={[
                Fonts.detailWhite,
                Gutters.regularBPadding,
                Fonts.textCenter,
              ]}
            >
              {networkName}
            </Text>
            <InputField
              placeholder="Network password (optional)"
              hideInput
              useLightInput
              enabled={confirmEnabled}
              finishEditingCallback={passwordCallback}
            />
          </View>
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Gutters.largexlHPadding,
              Gutters.regularVPadding,
            ]}
          >
            <Button
              title={"Connect device"}
              clickCallback={confirmCallback}
              setEnabled={confirmEnabled}
              color={Colors.secondary}
              style={Layout.fill}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingsDeviceWifiContainer;
