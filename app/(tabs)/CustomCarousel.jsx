import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
	const flatlistRef = useRef();
	// Get Dimensions
	const screenWidth = Dimensions.get("window").width;
	const [activeIndex, setActiveIndex] = useState(0);

	// Data for carousel
	const carouselData = [
		{
			id: "01",
			image: require("../../assets/images/thumbnail.png"),
		},
		{
			id: "02",
			image: require("../../assets/images/thumbnail.png"),
		},
		{
			id: "03",
			image: require("../../assets/images/thumbnail.png"),
		},
	];

	// Auto Scroll
	useEffect(() => {
		const interval = setInterval(() => {
			let newIndex = activeIndex + 1;
			if (newIndex >= carouselData.length) {
				newIndex = 0;
			}
			flatlistRef.current.scrollToIndex({
				index: newIndex,
				animated: true,
			});
			setActiveIndex(newIndex);
		}, 2000);

		return () => clearInterval(interval); // Clear interval on component unmount
	}, [activeIndex, carouselData.length]);

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
		index: index,
	});

	//  Display Images // UI
	const renderItem = ({ item }) => (
		<View>
			<Image
				source={item.image}
				style={styles.image}
			/>
		</View>
	);

	// Handle Scroll
	const handleScroll = (event) => {
		// Get the scroll position
		const scrollPosition = event.nativeEvent.contentOffset.x;
		// Get the index of current active item
		const index = Math.round(scrollPosition / screenWidth);
		// Update the index
		setActiveIndex(index);
	};

	// Render Dot Indicators
	const renderDotIndicators = () => {
		return carouselData.map((dot, index) => (
			<View
				key={index}
				style={[
					styles.dot,
					{ backgroundColor: activeIndex === index ? 'orange' : 'white' },
				]}
			></View>
		));
	};

	return (
		<View style={styles.carouselContainer}>
			<FlatList
				data={carouselData}
				ref={flatlistRef}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				pagingEnabled={true}
				onScroll={handleScroll}
				showsHorizontalScrollIndicator={false}
				// Ensure to sync scroll event with a 16ms debounce to avoid excess re-renders
				scrollEventThrottle={16}
			/>

			<View style={styles.dotContainer}>
				{renderDotIndicators()}
			</View>
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	carouselContainer: {
		// marginTop: 50,
		alignItems: 'center',
	},
	image: {
		height: 150,
		width: Dimensions.get("window").width-15,
		borderRadius: 10,
	},
	dotContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
	},
	dot: {
		height: 10,
		width: 10,
		borderRadius: 5,
		marginHorizontal: 6,
	},
});
