<template>
    <div
        class="ploogins:rounded-lg ploogins:p-4 ploogins:flex ploogins:gap-4 ploogins:justify-between ploogins:border-2 ploogins:min-h-[11.375rem] ploogins:bg-white ploogins:text-black ploogins:border-gray-300">
        <div class="ploogins:grow ploogins:flex ploogins:flex-col ploogins:gap-2">
            <div class="ploogins:flex ploogins:gap-4">
                <!-- Icon skeleton -->
                <div
                    class="ploogins:w-16 ploogins:h-16 ploogins:rounded-lg ploogins:bg-gray-200 ploogins:animate-pulse">
                </div>

                <div class="ploogins:flex ploogins:flex-col ploogins:gap-2 ploogins:flex-1">
                    <div>
                        <!-- Plugin name skeleton -->
                        <div
                            class="ploogins:h-6 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:mb-1 ploogins:w-3/4">
                        </div>
                        <!-- Author skeleton -->
                        <div
                            class="ploogins:h-4 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:w-1/2">
                        </div>
                    </div>

                </div>
            </div>

            <!-- Main purpose section skeleton -->
            <div class="ploogins:h-6 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:w-32"></div>

            <!-- Features skeleton -->
            <div class="ploogins:grid ploogins:grid-cols-4 ploogins:gap-2">
                <div v-for="i in 8" :key="i" class="ploogins:flex ploogins:items-center ploogins:gap-1">
                    <div class="ploogins:w-3 ploogins:h-3 ploogins:bg-gray-200 ploogins:rounded-full ploogins:animate-pulse ploogins:flex-shrink-0"></div>
                    <div class="ploogins:h-3 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:flex-1"></div>
                </div>
            </div>
        </div>

        <!-- Right side skeleton -->
        <div class="ploogins:flex ploogins:flex-col ploogins:justify-between ploogins:min-w-fit">
            <!-- Rating and downloads skeleton -->
            <div class="ploogins:flex ploogins:gap-4">
                <div class="ploogins:flex ploogins:items-center ploogins:gap-2">
                    <div class="ploogins:w-4 ploogins:h-4 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse">
                    </div>
                    <div class="ploogins:h-4 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:w-8">
                    </div>
                </div>
                <div class="ploogins:flex ploogins:items-center ploogins:gap-2">
                    <div class="ploogins:w-4 ploogins:h-4 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse">
                    </div>
                    <div
                        class="ploogins:h-4 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:w-12">
                    </div>
                </div>
            </div>

            <!-- Playground & View button skeleton -->
            <div class="ploogins:flex ploogins:gap-4">
                <div class="ploogins:h-10 ploogins:bg-gray-200 ploogins:rounded-lg ploogins:animate-pulse ploogins:w-20">
                </div>
                <div class="ploogins:h-10 ploogins:bg-gray-200 ploogins:rounded-lg ploogins:animate-pulse ploogins:w-20">
                </div>
            </div>
        </div>
    </div>
</template>