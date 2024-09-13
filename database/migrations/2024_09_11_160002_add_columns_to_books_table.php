<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('books', function (Blueprint $table) {
            $table->string('format')->nullable()->after('price');
            $table->text('description')->nullable()->after('format');
            $table->string('cover_image_path')->nullable()->after('description');
            $table->integer('page_count')->nullable()->after('cover_image_path');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn(['format', 'description', 'coverImagePath', 'pageCount']);
        });
    }
}