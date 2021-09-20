
exports.up = function(knex) {
    return knex.schema.createTable("mensajes", table => {
        table.increments('id').primary();
        table.string('author').notNullable();
        table.string('text');
        table.string('date')
        table.timestamps(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mensajes')
};
