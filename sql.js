// Generated by CoffeeScript 1.6.3
module.exports = {
  bugs: {
    find: "SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product,\nc.name component, version, rep_platform platform, op_sys, priority, bug_severity severity,\nassigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time\nFROM bugs b\nLEFT JOIN products p ON b.product_id = p.id\nLEFT JOIN components c ON b.component_id = c.id\nWHERE bug_id = ?",
    findAll: "SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product,\nc.name component, version, rep_platform platform, op_sys, priority, bug_severity severity,\nassigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time\nFROM bugs b\nLEFT JOIN products p ON b.product_id = p.id\nLEFT JOIN components c ON b.component_id = c.id\nORDER BY bug_id DESC LIMIT 10000"
  }
};

/*
//@ sourceMappingURL=sql.map
*/