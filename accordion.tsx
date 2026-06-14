import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { RoadmapResult } from "@workspace/api-client-react/src/generated/api.schemas";

Font.registerHyphenationCallback((word) => [word]);

const BRAND_BLUE = "#3b82f6";
const DARK = "#0f172a";
const MUTED = "#64748b";
const LIGHT_BG = "#f8fafc";
const BORDER = "#e2e8f0";
const TAG_BG = "#eff6ff";
const TAG_TEXT = "#1d4ed8";
const COMPLETE_BG = "#f0fdf4";
const COMPLETE_BORDER = "#bbf7d0";
const COMPLETE_TEXT = "#15803d";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    backgroundColor: BRAND_BLUE,
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 28,
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  headerMeta: {
    alignItems: "flex-end",
  },
  headerMetaText: {
    fontSize: 8,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.3,
  },
  headerMetaUrl: {
    fontSize: 8,
    color: "rgba(255,255,255,0.55)",
    marginTop: 2,
  },

  // ── Hero band ───────────────────────────────────────────────────────────────
  heroBand: {
    backgroundColor: LIGHT_BG,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroLeft: {
    flex: 1,
    paddingRight: 16,
  },
  skillName: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 4,
  },
  levelTag: {
    backgroundColor: TAG_BG,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  levelTagText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: TAG_TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  overviewText: {
    fontSize: 9.5,
    color: MUTED,
    lineHeight: 1.6,
  },
  heroRight: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    minWidth: 110,
  },
  heroRightLabel: {
    fontSize: 7,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  heroRightValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  heroRightSub: {
    fontSize: 7.5,
    color: MUTED,
    marginTop: 2,
  },

  // ── Body ────────────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },

  // ── Week separator ───────────────────────────────────────────────────────────
  weekHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  weekLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  weekLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginHorizontal: 10,
  },

  // ── Day card ────────────────────────────────────────────────────────────────
  dayCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  dayCardCompleted: {
    borderColor: COMPLETE_BORDER,
    backgroundColor: COMPLETE_BG,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: LIGHT_BG,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  dayHeaderCompleted: {
    backgroundColor: COMPLETE_BG,
    borderBottomColor: COMPLETE_BORDER,
  },
  dayNumber: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: BRAND_BLUE,
    marginRight: 6,
    minWidth: 36,
  },
  dayTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    flex: 1,
  },
  completedBadge: {
    backgroundColor: COMPLETE_TEXT,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  completedBadgeText: {
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dayBody: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  // ── Task ────────────────────────────────────────────────────────────────────
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  taskBullet: {
    width: 14,
    marginTop: 1.5,
    alignItems: "center",
  },
  taskBulletCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: BRAND_BLUE,
    backgroundColor: "#ffffff",
  },
  taskBulletChecked: {
    backgroundColor: BRAND_BLUE,
  },
  taskText: {
    fontSize: 9,
    color: DARK,
    flex: 1,
    lineHeight: 1.5,
  },
  taskTextChecked: {
    color: MUTED,
  },

  // ── Resources ───────────────────────────────────────────────────────────────
  resourcesSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  resourcesLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 5,
  },
  resourcesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  resourceChip: {
    backgroundColor: TAG_BG,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  resourceChipText: {
    fontSize: 7.5,
    color: TAG_TEXT,
  },

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    backgroundColor: "#ffffff",
  },
  footerLeft: {
    fontSize: 7.5,
    color: MUTED,
  },
  footerRight: {
    fontSize: 7.5,
    color: BRAND_BLUE,
  },
});

interface RoadmapPDFProps {
  roadmap: RoadmapResult;
  checkedTasks?: string[];
}

function TaskBullet({ checked }: { checked: boolean }) {
  return (
    <View style={styles.taskBullet}>
      <View style={[styles.taskBulletCircle, checked ? styles.taskBulletChecked : {}]} />
    </View>
  );
}

function DayCardPDF({
  day,
  checkedTasks,
}: {
  day: RoadmapResult["days"][number];
  checkedTasks: string[];
}) {
  const allChecked = day.tasks.every((_, i) =>
    checkedTasks.includes(`day-${day.day}-task-${i}`)
  );

  return (
    <View style={[styles.dayCard, allChecked ? styles.dayCardCompleted : {}]} wrap={false}>
      <View style={[styles.dayHeader, allChecked ? styles.dayHeaderCompleted : {}]}>
        <Text style={styles.dayNumber}>Day {day.day}</Text>
        <Text style={styles.dayTitle}>{day.title}</Text>
        {allChecked && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>Completed</Text>
          </View>
        )}
      </View>
      <View style={styles.dayBody}>
        {day.tasks.map((task, i) => {
          const taskId = `day-${day.day}-task-${i}`;
          const checked = checkedTasks.includes(taskId);
          return (
            <View key={taskId} style={styles.taskRow}>
              <TaskBullet checked={checked} />
              <Text style={[styles.taskText, checked ? styles.taskTextChecked : {}]}>
                {task}
              </Text>
            </View>
          );
        })}

        {day.resources && day.resources.length > 0 && (
          <View style={styles.resourcesSection}>
            <Text style={styles.resourcesLabel}>Recommended Resources</Text>
            <View style={styles.resourcesWrap}>
              {day.resources.map((r, i) => (
                <View key={i} style={styles.resourceChip}>
                  <Text style={styles.resourceChipText}>{r}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export function RoadmapPDF({ roadmap, checkedTasks = [] }: RoadmapPDFProps) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weeks: RoadmapResult["days"][] = [];
  for (let i = 0; i < roadmap.days.length; i += 7) {
    weeks.push(roadmap.days.slice(i, i + 7));
  }

  return (
    <Document
      title={`${roadmap.skillName} Learning Roadmap — Pathfinder`}
      author="Pathfinder"
      subject={`${roadmap.experienceLevel} ${roadmap.skillName} roadmap — ${roadmap.duration}`}
      creator="Pathfinder"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.brandName}>Pathfinder</Text>
            <View style={styles.headerMeta}>
              <Text style={styles.headerMetaText}>AI Skill Roadmap Generator</Text>
              <Text style={styles.headerMetaUrl}>Generated on {today}</Text>
            </View>
          </View>
        </View>

        {/* Hero band */}
        <View style={styles.heroBand}>
          <View style={styles.heroLeft}>
            <Text style={styles.skillName}>{roadmap.skillName}</Text>
            <View style={styles.levelTag}>
              <Text style={styles.levelTagText}>{roadmap.experienceLevel}</Text>
            </View>
            <Text style={styles.overviewText}>{roadmap.overview}</Text>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroRightLabel}>Duration</Text>
            <Text style={styles.heroRightValue}>{roadmap.duration}</Text>
            <Text style={styles.heroRightSub}>{roadmap.totalDays} days total</Text>
          </View>
        </View>

        {/* Day cards grouped by week */}
        <View style={styles.body}>
          {weeks.map((weekDays, wi) => (
            <View key={wi}>
              <View style={styles.weekHeader}>
                <View style={styles.weekLine} />
                <Text style={styles.weekLabel}>
                  {roadmap.totalDays <= 7
                    ? "Your Roadmap"
                    : `Week ${wi + 1}`}
                </Text>
                <View style={styles.weekLine} />
              </View>
              {weekDays.map((day) => (
                <DayCardPDF key={day.day} day={day} checkedTasks={checkedTasks} />
              ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            Pathfinder · {roadmap.skillName} · {roadmap.experienceLevel}
          </Text>
          <Text style={styles.footerRight}>pathfinder.replit.app</Text>
        </View>
      </Page>
    </Document>
  );
}
