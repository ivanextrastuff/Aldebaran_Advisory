"""Financial model for ROCKWOOL Denmark's Astral Heading growth strategy.

The model compares the commercial investment with revenue attributable to the
Astral Heading initiatives over 2027-2030. It assumes the initiative-driven
revenue uplift is added in four equal annual increments, so each year's
incremental revenue is 25% of the €7.2M 2030 initiative target. Contribution
is calculated on that year's increment only; carry-over revenue and any value
after 2030 are excluded. Natural market growth is reported separately and is
not credited to the commercial initiatives.

Requirements:
    pip install pandas matplotlib seaborn

Run:
    python rockwool_financial_model.py

The script prints the headline metrics and yearly projection, then saves
``rockwool_financial_model.png`` next to this file.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns


# Strategy inputs
BASE_YEAR = 2026
START_YEAR = 2027
END_YEAR = 2030
BASE_REVENUE_EUR = 60_000_000
TARGET_REVENUE_EUR = 72_000_000
TOTAL_GROWTH_PCT = 0.20
NATURAL_GROWTH_PCT_POINTS = 0.08
INITIATIVE_GROWTH_PCT_POINTS = 0.12
ANNUAL_COMMERCIAL_SPEND_EUR = 135_000
CONTRIBUTION_MARGIN = 0.25


def build_projection() -> tuple[pd.DataFrame, dict[str, float]]:
    """Build the annual initiative projection and calculate return metrics."""
    years = list(range(START_YEAR, END_YEAR + 1))
    year_count = len(years)
    total_investment = ANNUAL_COMMERCIAL_SPEND_EUR * year_count
    total_revenue_growth = TARGET_REVENUE_EUR - BASE_REVENUE_EUR
    initiative_revenue_target = BASE_REVENUE_EUR * INITIATIVE_GROWTH_PCT_POINTS
    natural_growth_revenue = BASE_REVENUE_EUR * NATURAL_GROWTH_PCT_POINTS
    annual_initiative_revenue = initiative_revenue_target / year_count

    projection = pd.DataFrame(
        {
            "Year": years,
            "Spend (€)": [ANNUAL_COMMERCIAL_SPEND_EUR] * year_count,
            "Incremental Revenue (€)": [annual_initiative_revenue] * year_count,
        }
    )
    projection["Gross Contribution (€)"] = (
        projection["Incremental Revenue (€)"] * CONTRIBUTION_MARGIN
    )
    projection["Net Cash Flow (€)"] = (
        projection["Gross Contribution (€)"] - projection["Spend (€)"]
    )
    projection["Cumulative Net Cash Flow (€)"] = projection[
        "Net Cash Flow (€)"
    ].cumsum()

    gross_contribution = float(projection["Gross Contribution (€)"].sum())
    net_contribution = gross_contribution - total_investment
    metrics = {
        "total_investment": float(total_investment),
        "total_revenue_growth": float(total_revenue_growth),
        "natural_growth_revenue": float(natural_growth_revenue),
        "initiative_revenue": float(initiative_revenue_target),
        "gross_contribution": gross_contribution,
        "net_contribution": float(net_contribution),
        "net_roi_multiple": float(net_contribution / total_investment),
        "revenue_leverage": float(initiative_revenue_target / total_investment),
    }

    return projection, metrics


def validate_inputs(metrics: dict[str, float]) -> None:
    """Fail clearly if the strategy inputs no longer reconcile."""
    expected_years = END_YEAR - START_YEAR + 1
    if expected_years != 4:
        raise ValueError("This model expects a four-year execution window.")
    if abs(TOTAL_GROWTH_PCT - NATURAL_GROWTH_PCT_POINTS - INITIATIVE_GROWTH_PCT_POINTS) > 1e-9:
        raise ValueError("Natural and initiative growth must sum to total growth.")
    if abs(metrics["total_revenue_growth"] - BASE_REVENUE_EUR * TOTAL_GROWTH_PCT) > 0.01:
        raise ValueError("Base and target revenue do not match the stated growth rate.")
    if abs(
        metrics["natural_growth_revenue"]
        + metrics["initiative_revenue"]
        - metrics["total_revenue_growth"]
    ) > 0.01:
        raise ValueError("The natural and initiative revenue components do not reconcile.")


def format_eur(value: float) -> str:
    """Format an amount as whole euros with thousands separators."""
    return f"€{value:,.0f}"


def print_results(projection: pd.DataFrame, metrics: dict[str, float]) -> None:
    """Print headline results and the annual projection."""
    print("ROCKWOOL Denmark — Astral Heading Commercial Growth Strategy")
    print(f"Revenue: {format_eur(BASE_REVENUE_EUR)} ({BASE_YEAR}) -> "
          f"{format_eur(TARGET_REVENUE_EUR)} ({END_YEAR})")
    print(
        f"Growth breakdown: {format_eur(metrics['natural_growth_revenue'])} "
        f"natural market growth + {format_eur(metrics['initiative_revenue'])} "
        "Astral Heading initiatives"
    )
    print(f"Total commercial investment: {format_eur(metrics['total_investment'])}")
    print(
        "Total gross incremental contribution from initiatives: "
        f"{format_eur(metrics['gross_contribution'])}"
    )
    print(f"Net contribution after investment: {format_eur(metrics['net_contribution'])}")
    print(f"Net ROI multiple (net contribution / investment): "
          f"{metrics['net_roi_multiple']:.2f}x")
    print(
        "Revenue leverage (initiative revenue / investment): "
        f"{metrics['revenue_leverage']:.2f}x"
    )
    print("\nYearly projection (initiative-attributable revenue increments):")

    display = projection.copy()
    for column in (
        "Spend (€)",
        "Incremental Revenue (€)",
        "Gross Contribution (€)",
        "Net Cash Flow (€)",
        "Cumulative Net Cash Flow (€)",
    ):
        display[column] = display[column].map(format_eur)
    print(display.to_string(index=False))


def save_chart(projection: pd.DataFrame) -> Path:
    """Plot and save cumulative net cash flow across the execution years."""
    sns.set_theme(style="whitegrid", context="talk")
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(
        projection["Year"],
        projection["Cumulative Net Cash Flow (€)"] / 1_000_000,
        color="#005A9C",
        marker="o",
        linewidth=3,
        markersize=8,
    )
    ax.axhline(0, color="#666666", linewidth=1)
    ax.set(
        title="Astral Heading — Cumulative Net Return",
        xlabel="Execution year",
        ylabel="Cumulative net cash flow (€ millions)",
        xticks=projection["Year"],
    )
    ax.margins(x=0.08)
    ax.yaxis.set_major_formatter(lambda value, _: f"€{value:.1f}M")

    for year, value in zip(
        projection["Year"], projection["Cumulative Net Cash Flow (€)"] / 1_000_000
    ):
        ax.annotate(
            f"€{value:.2f}M",
            (year, value),
            xytext=(0, 12),
            textcoords="offset points",
            ha="center",
            fontsize=10,
        )

    fig.tight_layout()
    output_path = Path(__file__).resolve().with_name("rockwool_financial_model.png")
    fig.savefig(output_path, dpi=180, bbox_inches="tight")
    plt.close(fig)
    return output_path


def main() -> None:
    """Run the model, display its outputs, and generate the chart."""
    projection, metrics = build_projection()
    validate_inputs(metrics)
    print_results(projection, metrics)
    chart_path = save_chart(projection)
    print(f"\nChart saved to: {chart_path}")


if __name__ == "__main__":
    main()
