<template>
    <div class="my-4 min-vh-75">
        <section class="container">
            <div class="row">
                <div class="col">
                    <h2>
                        Explore the books below
                    </h2>
                    <p>
                        Use the filter functionality to narrow down your search
                    </p>
                </div>
            </div>

            <div class="row">
                <div class="col pb-2">
                    <label for="search">Search:</label>
                    <input v-model="search" type="text" id="search" class="form-control" placeholder="Search...">
                </div>
                <div class="col-md-auto pb-2">
                    <label for="filterBy">Filter by:</label>
                    <select v-model="filterType" class="form-select" id="filterBy">
                        <option selected value="all">All</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                </div>
                <div class="col-md-auto pb-2">
                    <label for="order">Order:</label>
                    <select v-model="sortOrder" class="form-select" id="order">
                        <option value="asc" selected>Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <hr>
        </section>
        <div class="container my-4">
            <div class="row align-items-stretch" id="books-list">
                <div v-if="filteredBooks.length <= 0" class="text-center">
                    <h4 class="p-5">No results for "{{ search }}"</h4>
                </div>
                <div v-else class="col-lg-4 col-6 mb-3" v-for="book in filteredBooks" :key="book.id">
                    <div v-if="filterType == 'author'" class="border p-4 h-100">
                        <h5 class="text-capitalize"><small class="text-muted">Author:</small> {{
                            book.volumeInfo.authors.join(', ') }}</h5>
                        <p><small class="text-muted">Title:</small> {{ book.volumeInfo.title }}</p>
                        <p><small class="text-muted">Year:</small> {{ book.volumeInfo.publishedDate }}</p>
                    </div>
                    <div v-else class="border p-4 h-100">
                        <h5 class="text-capitalize">{{ book.volumeInfo.title }}</h5>
                        <p><small class="text-muted">Author:</small> {{ book.volumeInfo.authors.join(', ') }}</p>
                        <p><small class="text-muted">Year:</small> {{ book.volumeInfo.publishedDate }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import booksData from '@/data/books.json';
export default {
    data() {
        return {
            books: booksData,
            search: '',
            filterType: 'all',
            sortOrder: 'asc'
        };
    },
    computed: {
        filteredBooks() {
            let result = this.books;

            // Filter based on the filter type
            if (this.filterType !== 'all') {
                result = result.filter(book => {
                    const searchLower = this.search.toLowerCase();
                    if (this.filterType === 'title') {
                        return book.volumeInfo.title.toLowerCase().includes(searchLower);
                    } else if (this.filterType === 'author') {
                        return book.volumeInfo.authors.join(', ').toLowerCase().includes(searchLower);
                    }
                });
            } else if (this.search) {
                result = result.filter(book =>
                    book.volumeInfo.title.toLowerCase().includes(this.search.toLowerCase()) ||
                    book.volumeInfo.authors.join(', ').toLowerCase().includes(this.search.toLowerCase()) ||
                    book.volumeInfo.publishedDate.toString().includes(this.search.toLowerCase())
                );
            }

            // Sorting
            result.sort((a, b) => {
                const compareValue = this.sortOrder === 'asc'
                    ? a.volumeInfo.title.localeCompare(b.volumeInfo.title)
                    : b.volumeInfo.title.localeCompare(a.volumeInfo.title);
                return compareValue;
            });

            return result;
        }
    }
};

</script>
