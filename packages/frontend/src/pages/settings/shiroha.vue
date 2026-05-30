<!--
SPDX-FileCopyrightText: syuilo and misskey-project & noridev and cherrypick-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<SearchMarker path="/settings/shiroha" label="Shiroha" :keywords="['shiroha']" icon="ti ti-settings">
	<div class="_gaps_m">
		<FormSection first>
			<template #label><SearchLabel>Shiroha独自機能の設定</SearchLabel></template>
			<div class="_gaps_s">
				<SearchMarker :keywords="['search', 'mfc', 'mfm', 'misskey']">
					<MkSwitch v-model="useSearchConversionSyntax">
						<template #label><SearchLabel>検索MFCをMisskey互換で表示</SearchLabel> <span class="_beta">Shiroha</span></template>
					</MkSwitch>
				</SearchMarker>

				<SearchMarker :keywords="['post', 'form', 'classic', 'misskey']">
					<MkSwitch v-model="useClassicPostForm">
						<template #label><SearchLabel>投稿フォームをMisskey仕様にする</SearchLabel> <span class="_beta">Shiroha</span></template>
					</MkSwitch>
				</SearchMarker>
			</div>
		</FormSection>
	</div>
</SearchMarker>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import MkSwitch from '@/components/MkSwitch.vue';
import FormSection from '@/components/form/section.vue';
import { store } from '@/store.js';
import { globalEvents } from '@/events.js';
import { definePage } from '@/page.js';
import { suggestReload } from '@/utility/reload-suggest.js';

const useSearchConversionSyntax = computed(store.makeGetterSetter('useSearchConversionSyntax'));
const useClassicPostForm = computed(store.makeGetterSetter('useClassicPostForm'));

// 投稿フォームの仕様変更は再読み込みが必要なためリロードを促す
watch(useClassicPostForm, () => {
	suggestReload();
});

// 検索表示の切り替えはタイムラインの再読み込みで即時反映する
watch(useSearchConversionSyntax, () => {
	globalEvents.emit('reloadTimeline');
});

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePage(() => ({
	title: 'Shiroha',
	icon: 'ti ti-settings',
}));
</script>
