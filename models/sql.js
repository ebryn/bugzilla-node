// Generated by CoffeeScript 1.6.3
module.exports = {
  bugs: {
    find: "SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product,\nc.name component, version, rep_platform platform, op_sys, priority, bug_severity severity,\nassigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time\nFROM bugs b\nLEFT JOIN products p ON b.product_id = p.id\nLEFT JOIN components c ON b.component_id = c.id\nWHERE bug_id = ?",
    findAll: "SELECT bug_id id, alias, bug_status status, short_desc summary, p.name product,\nc.name component, version, rep_platform platform, op_sys, priority, bug_severity severity,\nassigned_to, qa_contact, creation_ts creation_time, delta_ts last_change_time\nFROM bugs b\nLEFT JOIN products p ON b.product_id = p.id\nLEFT JOIN components c ON b.component_id = c.id\nORDER BY bug_id DESC LIMIT 10000"
  },
  comments: {
    find: "SELECT comment_id id, bug_id, thetext text, p.realname creator, bug_when created_at, isprivate is_private\nFROM longdescs ld\nLEFT JOIN profiles p ON ld.who = p.userid\nWHERE bug_id = ? AND comment_id = ?",
    findAll: "SELECT comment_id id, bug_id, thetext text, p.realname creator, bug_when created_at, isprivate is_private\nFROM longdescs ld\nLEFT JOIN profiles p ON ld.who = p.userid\nWHERE bug_id = ?\nORDER BY comment_id"
  }
};

/*
//@ sourceMappingURL=sql.map
*/