import {StyleSheet} from "react-native"
import { colors, fontFamily } from "@/styles/theme";


export const s = StyleSheet.create({
    container: {
        height: 56,
        maxHeight: 56,
        backgroundColor: colors.green.base,
        borderRadius: 10,
        alignItems:"center",
        justifyContent: "center",
        gap: 14,
        flexDirection: "row"
    },
    title: {
        fontSize: 26,
        color: colors.gray[100],
        fontFamily: fontFamily.semiBold,
    }
})