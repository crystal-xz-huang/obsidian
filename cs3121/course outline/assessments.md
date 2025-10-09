---
tags: ["#overview-pages"]
aliases: [Assessments]
cssclasses:
---
# Course Assessment

| Assessment Item | Weight |
| --------------- | ------ |
| Portfolio       | 60%    |
| Final Exam      | 40%    |

##### General info

Up to 5 bonus marks will be awarded for contribution to other students' learning. This is awarded on the basis of constructive participation in lecture, seminar and lab classes, as well as activity (including anonymous activity) on the course forum (Discourse). We typically award at least one bonus mark to about 3% of students, and about half as many students receive each additional mark.

##### Requirements to pass course

To pass the course, students must achieve a total mark of at least 50 out of 100, and pass the hurdle requirement in the final exam.

# Assessment Details

## Portfolio

Portfolio consists of responses to a collection of formative tasks completed during the term.
Weighted 60% of course mark.

- Tasks available on Formatif
- In each task, incorporate lab instructor’s feedback until task complete
- Contract grading:
	- Choose your target grade (Pass, Credit, Distinction, High Distinction)
	- You can change this at any time
	- Attempt tasks <u>up to this level inclusive</u>
- At end of term, complete the **Create Portfolio** task and include a **Learning Summary Report** to recap what you found instructive and highlight your attainment of learning outcomes.

### Portfolio Evaluation

The raw portfolio is a weighted aggregate of tasks marked as complete. 
Each task carries a very small amount of marks, and completing a task earns you those marks. 

- Only tasks with **Complete** status earn marks. 
- Other statuses (Discuss, Resubmit, Redo, Time Exceeded) earn **no marks**.

Sum up the weightings of all completed tasks:

| Task type       | (R) | (L) | (M) | (D) |
| --------------- | --- | --- | --- | --- |
| Relative weight | 5   | 2   | 2   | 10  |

Weightings are then aggregated per target grade:

| Grade level  | PS  | CR  | DN  | HD  |
| ------------ | --- | --- | --- | --- |
| Total weight | 55  | 15  | 15  | 15  |
i.e. All PS tasks together are worth 55% of portfolio.

The pure weighting $w'(t)$ of a task $t$ in the set of tasks $T$ (containing all tasks with the same target grade as $t$) can be computed as:

$$w'(t) = \dfrac{w(t)}{\sum_{t' \in T} w(t')} \cdot p(T)  $$

where:
- $w(t)$ is the assigned weight of task $t$, and
- $p(T)$ is the proportion of the portfolio assigned to tasks in $T$ (in the table above).

The pure weighting $w'(t)$ is always a real number between 0 and 1; the sum of pure weightings over all tasks is 1.

> [!NOTE] Expected outcomes
> - All Pass tasks only → ~55–60% (Pass)
> - All but a few HD tasks → ~95–100% (High Distinction)
> - Median student: All Pass + Credit, some Distinction → ~75%

### Formatif Tasks

- Task types: (D)emonstration, (M)oodle, (R)egular, (L)aTeX
- Task sheets on Formatif
- Task resources on Moodle, download and import the zip folder to Overleaf

4 types of tasks:

- **Demo tasks (D)** 
	- You will be required to demo one of your tasks from the corresponding week, answer some related questions, and engage in discussion with your tutor.
	- You should attend your timetabled lab to complete the demo requirements where possible, but if absolutely necessary, you can also do this at other labs.
- **Moodle tasks (M)**
	- You need to complete this quiz with ==full marks== to complete the task
	- ==Unlimited attempts== (unless otherwise specified)
	- The due date is the date listed in the text next to the link on Formatif (which is also the date that the quiz closes on Moodle).
	- No extension requests allowed 
- **Regular tasks (R)** 
	- PDF submission (any format, doesn’t have to be LaTeX).
- **LaTeX tasks (L)** 
	- PDF + LaTeX source code submission 
	- You will be assessed on not only the content but also your use of LaTeX for document preparation.

## Final Exam

- Multiple choice, short answer and algorithm design problems
- Easier than comparable portfolio tasks
- **Hurdle: 40% required to pass the course**
- INSPERA (on campus)
- **Weighted 40% of course mark**

---

# Portfolio (60%)

## Contract Grading 

The portfolio assessment is based on the principle of **contract grading**. Students select a target grade (which can be changed at any time) from the progress dashboard (see example below).

Students are expected to attempt tasks **up to their target grade inclusive**.

Higher grade tasks involve more independent problem solving and extension material, and often higher standards of rigour.

Most students should choose a grade contract of **Credit** or **Distinction**.

## Task Types 

Each task has an associated grade level (Pass, Credit, Distinction or High Distinction), as well as tags in parentheses indicating what type of task it is.

- (M) indicates a **Moodle** task.
	- The task details on Formatif will include a link to a Moodle quiz; these are not accessible through Moodle.
	- You need to complete this quiz with full marks to complete the task.
	- Task completion in Formatif will be synced automatically within a couple of days of completing the quiz on Moodle. We run this manually using a bot. You do NOT need to request extensions on Moodle tasks, since their due dates on Moodle include any native extensions on Formatif. Extension requests will be denied.
	- Completion in Formatif will be synced even if you complete the quiz late.
	- However, once the quiz closes, you cannot attempt the quiz.
	- This means you cannot attempt quizzes due close to the start of term again at the end of term, for example.
	- Quizzes will still be open for self-review after the due date.
	- You have unlimited attempts on all Moodle quizzes unless otherwise specified.
- (R) indicates a **regular** task.
	- You can view the task sheet by downloading it from the bottom of the "Task Details" section, or in-place using the magnifying glass icon in the top right.
	- You will need to prepare a written response to the task in the form of a PDF. This PDF can be produced using LaTeX, any word processor, handwritten or any other means.
	- Unlike previous terms, these ordinarily do not use the "Discuss" status, unless your demonstrator has reason to use it. Completion of the task will mostly be met with the "Complete" status.
	- These will be marked completely online.
- (L) indicates a **LaTeX** task.
	- You can again view the task sheet, similar to the (R) tasks above.
	- You will need to prepare a written response to the task using LaTeX. The submission will consist of the compiled PDF as well as the LaTeX source code used to produce it.
- (D) indicates a **demo** task. Each batch of tasks corresponding to weeks 1–5, 7 and 8 contains one of these tasks.
	- The descriptor also applies to 0.03 Introduce Yourself, which is a simple icebreaker activity.
	- These require no submission and are marked purely in person.
	- You will be required to demo one of your tasks from the corresponding week, answer some related questions, and engage in discussion with your tutor.
	- The weekly demo tasks replace the checkpoint requirement from previous terms; discussion requirements are no longer coupled with the completion of a task.
	- The choice of which task to demo is always up to the instructor, not the student.
	- You should attend your timetabled lab to complete the demo requirements where possible, but if absolutely necessary, you can also do this at other labs.
	- You will not be prioritised at other labs.
	- This is also the best time to ask about minor questions to do with your other tasks.
	- These are also binary marked; either the demonstration is complete, or it is incomplete.

The task sheet will also indicate if the task is **extension** (material beyond the scope of lectures, to be self-learnt) and/or **very hard** (the hardest tasks of the entire course, which should be your last priority).

---

## Written tasks

When you first open a task, the task status will be **Not Started**. You can optionally set it to **Working On It** to indicate to staff what you are working on, but this isn't required.

If you have made an attempt but recognise that it is incomplete or incorrect, or if there's a specific question you want resolved, you should set the status to **Need Help**, and add a chat message to explain. An instructor will usually respond within a couple of days, sometimes sooner. This status will require a submission; if you haven't been able to make any progress yet, you can just submit the task sheet unchanged (and the task resources for LaTeX). This is explicitly **not** for marking; submissions for marking should have the status **Ready for Feedback**.

If you have made an attempt that you think is satisfactory, you should set the status to **Ready for Feedback**, and follow the prompts to upload the necessary files. Note that uploading directly from a `.zip` archive is not possible; you'll have to extract the files first. Files sent in the chat sidebar will be ignored.

**You should download your file after submitting to ensure you have submitted the right file. Extensions will not be granted for submitting the wrong file.**

The remaining task statuses are set by instructors only, upon assessing your work.

- If your submission is satisfactory, the status will be set to **Complete**. There is nothing more to do for a task with this status.
    - This is the status that earns marks for that task.
    - There are no penalties for previous statuses or multiple rounds of feedback; once you have this status, you have earned the marks.
- **Discuss** status may be used occasionally.
    - This usually indicates that the task is almost complete, but there is something that your marker wants to briefly address in person.
- If your submission has minor flaws, the status will be set to **Resubmit**, with feedback in the chat sidebar. You should address the feedback and submit again using the **Ready for Feedback** status, indicating clearly what you have changed between your previous submission and the new one.
- If your submission has made little or no progress towards completing the task, the status will be set to **Redo**, with feedback in the chat sidebar. If you want to re-attempt the task, you may find it more productive to start again.
- If you have not addressed multiple rounds of feedback, the status will be set to **Feedback Exceeded**, indicating that you are not making progress and should move on to a different task.

Late submissions will be automatically set to **Time Exceeded**, with an explanation to follow later in this quiz.

---

## Moodle tasks

As above, except the following.

- There is no need to upload files for the **Need Help** or **Ready for Feedback** status.
- The due date is the date listed in the text next to the link on Formatif (which is also the date that the quiz closes on Moodle).
- Quizzes can be re-attempted as many times as you like. Only the highest mark will be recorded. If you have attempted the quiz with a 100% attempt, you'll be marked off even if the status is **Time Exceeded**.
- If you cannot attempt the quiz because the quiz has closed, you will not receive any marks.
- Sometimes, a question is worth 0 marks. Such a question is optional; it's intended that you can get full marks on the quiz even if you don't attempt that question.
- Every couple of days, we will run a script to sync the completion of Moodle quizzes (per the Moodle gradebook) with the associated Formatif tasks. This will automatically assign **Complete** status if you have achieved full marks in the quiz. Please be patient with this; requests for staff to do this manually will be ignored.
    

You are most welcome to ask questions about Moodle tasks during labs, on the forum or using the **Need Help** status.

---

# Due Dates

Every task has a **Start Date**, which is a recommendation of when you should start working on the task, usually aligning with lecture content. Days until the start date are indicated by the hourglass icon with sand in the top half.

Every task has a **Due Date**, which (for non-Moodle tasks) is the date before which you should have the task marked with "Complete" status on Formatif. Submissions that are made before this date will be receive online marking and feedback once, even after the due date. Days until the due date are indicated by the hourglass icon with sand in the bottom half. All dates are in Anywhere-on-Earth (AoE) time, i.e. so long as it is that date somewhere, the task is not overdue yet.

⚠️ Note however that these tasks are _not_ assignments, so you should be working on them continuously and submitting them regularly. Students who wait until close to the due date to submit can also expect a longer wait time for feedback.

**To reiterate, you should have the tasks marked as Complete by the originally listed due date. The due date is not for a first submission.**
- All tasks set in Week _n_ will follow the table below, with the following additional details.
    - Due on the dates listed. These are also the dates listed in Formatif.
    - Not be marked more than 7 days after the listed due date, including any extensions. This is the maximum due date. This also covers extensions and ELPs, up to 7 days.
        - ELPs usually offer 1–3 days for regular submissions, which are applicable for Formatif tasks.
        - Tasks set in Week 4 differ, as they are not to be marked 14 days after the listed due date, including any extensions (rather than 7). All other weeks retain the aforementioned structure.
    - If you believe you have an exception, you should email the course account.
- Intended workflow:
    - When tasks are released in Week _n_, attempt them at some point during Week _n_.
    - If you need to, iterate on the feedback.
    - Complete your tasks in Week _n+1_, and move on to that week's tasks concurrently.
        - If you attempt your Week _n_ tasks early, tutors may give you more feedback and hints (where required) going into Week _n+1_.
    - Complete the Week _n_ Demo task in Week _n+1_.
    - It's natural that you deviate from this as your circumstances dictate, hence the leniency.
    - Any aberrations to this schedule will be posted in an announcement.

| Week | Task Release (approx) | Due Date           |
| ---- | --------------------- | ------------------ |
| 1    | Monday Week 1         | AoE Friday Week 2  |
| 2    | Monday Week 2         | AoE Friday Week 3  |
| 3    | Monday Week 3         | AoE Friday Week 4  |
| 4    | Monday Week 4         | AoE Friday Week 5  |
| 5    | Monday Week 5         | AoE Friday Week 7  |
| 7    | Monday Week 7         | AoE Friday Week 8  |
| 8    | Monday Week 8         | AoE Friday Week 9  |
| 9    | Monday Week 9         | AoE Friday Week 10 |

## Extensions

You can request that your due date for a task be extended by one week by clicking the "Request an Extension" button and providing a reason consisting of at least 15 characters. This is the process that you should use if you have a submission flexibility provision in your Equitable Learning Plan, if you were sick for a short period, or if you have a small amount of work outstanding. If you are significantly falling behind, the correct procedure is to temporarily lower your target grade.

- If an extension is requested on day _x_, the new due date is:
    
    **min(x + 7, maximum due date)**
    
- If you want extensions on several tasks, you will need to request each one individually.
- Extension requests are not guaranteed to be approved. They will be adjudged based on whether we think you can actually catch up. We will often recommend that you lower your target grade (at least in the short term) in order to get back up to date.
- If you receive "Resubmit" status for a task, then you will automatically be granted an extension as above, as if you had requested one and had it granted. Note that this does not stack with requested extensions; the maximum extension for any task is one week.

---

## Late Submissions

- Any submissions after your Due Date will receive **Time Exceeded** status. These submissions will not be marked.
- As such (and before), you should treat the listed due dates of the tasks on Formatif as the due dates for task **completion**, not the last catch-up dates for online marking.
    - Start and submit early.
    - Do NOT rely too heavily on incremental feedback.
    - It should ideally not take an excessive number of iterations (4+) to have a successful submission.
- To compensate, if your task has not been marked for at least 7 days, you are eligible for an exception. Please seek these using the marking follow-up tag on the forum.
    - You need to resubmit within a specified time frame, otherwise, the follow-up will be invalidated.

---

## Exceptions

Exceptions can also be made for students:

- with an Equitable Learning Plan with a provision for flexibility in regular submissions, or
- with approved Special Consideration where the affected period exceeds two weeks.

Please contact us by email if this applies to you.

---

# Marks Aggregation

You might see a task called **"Create Portfolio"** on Formatif. You can ignore this task.

Portfolios will be graded with a holistic assessment made by your tutor. This assessment is mostly based on your quantity of satisfactory work, aggregating completed tasks.

Your tutor will also factor in the quality of your work, including your writing, demonstrations and progress on incomplete tasks. Even so, the raw portfolio mark (described below) is a very good estimate of your portfolio mark. The raw portfolio mark will be released at the end of the term, as an approximation for your awarded portfolio mark.

### Raw Portfolio Mark

The raw portfolio is a weighted aggregate of tasks marked as complete. Each task carries a very small amount of marks, and completing a task earns you those marks. Marks are awarded for **Complete** status only.

In particular, **Discuss, Resubmit, Redo and Time Exceeded** status earn **no marks**.

- (R) tasks are assigned a weight of 5.
- (L) and (M) tasks are assigned a weight of 2.
- (D) tasks are assigned a weight of 10 (except for _Introduce Yourself_).

Weightings are then aggregated per target grade:

- All **PS** tasks together are worth 55% of the portfolio,
- All **CR** tasks together are worth 15% of the portfolio,
- All **DN** tasks together are worth 15% of the portfolio, and
- All **HD** tasks together are worth 15% of the portfolio.
    
The pure weighting w'(t) of a task (t) in the set of tasks (T) (containing all tasks with the same target grade as (t)) can be computed as:

$$w'(t) = \dfrac{w(t)}{\sum_{t' \in T} w(t')} \cdot p(T)  $$

where:

- (w(t)) is the assigned weight of task (t), and
- (p(T)) is the proportion of the portfolio assigned to tasks in (T) (in the list above).
    

The pure weighting (w') is always a real number between 0 and 1; the sum of pure weightings over all tasks is 1.

For example,

- A student who completes **all the PS tasks** and only a few CR tasks can expect a raw portfolio mark between **55%** and **60%**.
- The rare student who completes **all but a handful of HD tasks** will typically get between **95%** and **100%**.
- The **median student** should complete all the PS and CR tasks, as well as some DN work, for a portfolio mark of about **75%**.

These boundaries are deliberately more generous than the typical UNSW grade definitions.

We _strongly_ advise that you just do the tasks you can, subject to your level of interest and the other constraints on your time. Focusing too much on the fine details of the marks misses the point.

---

# Exam

The exam consists of multiple choice questions, short answer questions and algorithm design problems. This may be subject to change. The precise format and a sample exam will be released towards the end of term.

The exam has a hurdle requirement of **40%**. This means that you need to achieve 40% of the available marks in the exam in order to pass the course. If you achieve a course mark of at least 50 but do not meet the hurdle requirement, you will receive **UF (unsatisfactory fail)** grade. Failing the hurdle requirement is not grounds to receive a supplementary exam; these are only offered to potential graduands and students with approved Special Consideration.

### Calculating Marks

The portfolio is worth **60%** of your course mark, and the exam is worth the remaining **40%**.

For example, suppose Alice and Bob are two students in the course:

- Alice was awarded **70%** for her portfolio, and scored **65/100** in the final exam.
- Bob was awarded **85%** for his portfolio, and scored **35/100** in the final exam.
    

Alice would receive a grade of **CR**, and Bob would receive a grade of **65 UF**.

---

### Bonus Marks

A small number of students who make consistent contributions to other students' learning in classes and on the forum may receive up to **five bonus marks**, entirely at the discretion of staff. We typically award at least one bonus mark to about 3% of students, and about half as many students receive additional marks.
