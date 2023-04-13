import React, { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";

import { Icon, useColorModeValue } from "@chakra-ui/react";

import IconBox from "components/icons/IconBox";
import MiniStatistics from "components/card/MiniStatistics";

import { getCurrentWeather } from "networking/api";

export default function MiniCalendar(props) {
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const brandColor = useColorModeValue("brand.500", "white");


    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getCurrentWeather()
            .then((data) => {
                console.log(data);
                setWeather(data);
            });
    }, []);

    return (
        <MiniStatistics
            startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={
                        <Icon w='32px' h='32px' as={WiDaySunny} color={brandColor} />
                    }
                />
            }
            name='Curr. Weather'
            value={weather == null ? "- °C" : `${weather.airTemperature} °C`}
        />
    );
}
