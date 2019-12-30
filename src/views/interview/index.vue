<template>
	<div id="interview">
    <FloatBox />
    <Siderbar />
    <AdsorptionBar />
	</div>
</template>
<script>
import Siderbar from './components/siderbar'
import FloatBox from './components/content'
import AdsorptionBar from './components/adsorptionBar'
export default {
	components: {
		Siderbar,
		FloatBox,
		AdsorptionBar
	}
}
</script>
<style lang="scss" scoped>
#interview{
	width: $page-width;
	margin: 30px auto;
	display: flex;
}
</style>
