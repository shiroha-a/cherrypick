<template>
	<div class="_gaps_m">
			<FormSection>
					<template #label>Shiroha 独自機能の設定</template>

					<div class="_gaps_s">
							<MkSwitch v-model="useSearchConversionSyntax">検索MFCをMisskey互換で表示<template #caption>検索文を "[検索]" の形式で表示します</template></MkSwitch>
					</div>
			</FormSection>
	</div>
	</template>

	<script lang="ts" setup>
	import { computed, onMounted, ref, watch } from 'vue';
	import { defaultStore } from '@/store.js';
	import FormSection from '@/components/form/section.vue';
	import MkSwitch from '@/components/MkSwitch.vue';
	import { definePageMetadata } from '@/scripts/page-metadata.js';
	import { globalEvents } from '@/events.js';
	import { i18n } from '@/i18n.js';
	import { miLocalStorage } from '@/local-storage.js';
	import { reloadAsk } from '@/scripts/reload-ask.js';

	const useSearchConversionSyntax = computed(defaultStore.makeGetterSetter('useSearchConversionSyntax'));
	const storedSearchConversion = ref(miLocalStorage.getItem('useSearchConversionSyntax') === 'true');

	watch([
	], async () => {
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

	watch([useSearchConversionSyntax], async () => {
			await reloadTimeline();
	});

	function reloadTimeline() {
			globalEvents.emit('reloadTimeline');
	}

	definePageMetadata(() => ({
			title: 'Shiroha Settings',
			icon: 'ti ti-settings',
	}));

	onMounted(() => {
	if (storedSearchConversion.value !== null) {
        defaultStore.set('useSearchConversionSyntax', storedSearchConversion.value);
	}
});

	</script>
