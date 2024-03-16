export const htmlMailTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <title>##report_title##</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Maksymilian Bahr">
</head>

<body style="margin: 1rem; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';">
    <div style="margin: 0 auto; max-width: 960px;">
        <div style="display: flex; align-items: center;">
            <h1 style="margin-top: 0;">##report_title_h1##</h1>
        </div>
        <div style="margin-top: 1rem;">
            <h2 style="margin-top: 1rem;">Execution Summary</h2>
            ##summary_rows##
        </div>
        <div>
            <h2>Domain Test Summary</h2>
            <div style="border: 1px solid #ecf0f3; background-color: #fbfbfb; border-radius: 15px; margin-bottom: 20px; padding-left: 0.75rem; padding-right: 0.75rem;">
                <table style="width: 100%; vertical-align: middle; margin-bottom: 1rem; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid #d9cdcd;">
                            <th style="padding: 0.5rem 0.5rem; font-size: 1.1rem; text-align: left;">Domain</th>
                            <th style="padding: 0.5rem 0.5rem; font-size: 1.1rem; text-align: left;"></th>
                            <th style="padding: 0.5rem 0.5rem; font-size: 1.1rem; text-align: left;">Duration</th>
                        </tr>
                    </thead>
                    <tbody>    
                    ##domain_summary_rows##
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>

`;
