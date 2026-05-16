import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class GradeServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String[] subjects = new String[5];
        int[] marks = new int[5];

        for (int i = 0; i < 5; i++) {
            subjects[i] = request.getParameter("sub" + (i + 1));
            marks[i] = Integer.parseInt(request.getParameter("marks" + (i + 1)));
        }

        int total = 0;
        for (int m : marks) total += m;
        double average = total / 5.0;

        String overallGrade;
        if (average >= 90)      overallGrade = "A+";
        else if (average >= 80) overallGrade = "A";
        else if (average >= 70) overallGrade = "B";
        else if (average >= 60) overallGrade = "C";
        else if (average >= 50) overallGrade = "D";
        else                    overallGrade = "F";

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'><head><meta charset='UTF-8'/><title>Grade Result</title>");
        out.println("<style>");
        out.println("body { font-family: Arial, sans-serif; background: #f4f6f9; display: flex; flex-direction: column; min-height: 100vh; margin: 0; }");
        out.println(".container { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px; }");
        out.println(".card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 36px 40px; width: 520px; }");
        out.println("h2 { font-size: 22px; margin-bottom: 20px; }");
        out.println("table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }");
        out.println("th { background: #1a73e8; color: #fff; padding: 10px 12px; text-align: left; font-size: 13px; }");
        out.println("td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }");
        out.println(".summary { background: #f0f4ff; border: 1px solid #d0e1ff; border-radius: 6px; padding: 16px 20px; margin-bottom: 20px; font-size: 14px; }");
        out.println(".summary p { margin: 4px 0; color: #333; }");
        out.println(".overall { font-size: 18px; font-weight: bold; color: #1a73e8; }");
        out.println("a { display: inline-block; padding: 10px 24px; background: #1a73e8; color: #fff; border-radius: 4px; text-decoration: none; font-size: 14px; }");
        out.println("a:hover { background: #155bb5; }");
        out.println("footer { text-align: center; padding: 14px; font-size: 13px; color: #555; border-top: 1px solid #ddd; background: #fff; }");
        out.println("</style></head><body>");
        out.println("<div class='container'><div class='card'>");
        out.println("<h2>Grade Result</h2>");
        out.println("<table>");
        out.println("<tr><th>#</th><th>Subject</th><th>Marks</th><th>Grade</th></tr>");

        for (int i = 0; i < 5; i++) {
            String g;
            if (marks[i] >= 90)      g = "A+";
            else if (marks[i] >= 80) g = "A";
            else if (marks[i] >= 70) g = "B";
            else if (marks[i] >= 60) g = "C";
            else if (marks[i] >= 50) g = "D";
            else                     g = "F";
            out.println("<tr><td>" + (i+1) + "</td><td>" + subjects[i] + "</td><td>" + marks[i] + "</td><td>" + g + "</td></tr>");
        }

        out.println("</table>");
        out.println("<div class='summary'>");
        out.println("<p>Total Marks: <strong>" + total + " / 500</strong></p>");
        out.println("<p>Average: <strong>" + String.format("%.2f", average) + "</strong></p>");
        out.println("<p class='overall'>Overall Grade: " + overallGrade + "</p>");
        out.println("</div>");
        out.println("<a href='index.html'>Go Back</a>");
        out.println("</div></div>");
        out.println("<footer>@24071A05G3 (Kilaru Sahiti)</footer>");
        out.println("</body></html>");
    }
}
